/*!
 * web
 * 
 *
 * @version v1.0.0
 * @author 
 * @homepage undefined
 * @repository undefined
 * @license ISC
 */
let Token = (/** @type {RegExp} */ re, skip = true) =>
    /**
     *
     * @this {any}
     * @returns
     */
    function () {
        return this.MATCH(
            re,
            (/** @type {RegExpMatchArray} */ m) => ({
                token: "any",
                value: m[0],
                list: [...m],
                index: m.index,
                groups: m.groups,
                hidden: !skip,
            }),
            skip
        )
    };

class BaseParser {
    /** @type {import("./types").State[]} */
    states = [{ input: "", nodes: [], scope: [], level: 0 }]

    /**
     * @param {string} input
     */
    constructor(input) {
        if (!input) throw new TypeError("input is required")
        this.getState().input = input;
    }

    newState() {
        return this.states.unshift({
            input: this.getState().input,
            nodes: [],
            scope: this.getState().scope,
            level: this.getState().level,
        })
    }

    getState() {
        return this.states[0]
    }

    /**
     *
     * @returns {import("./types").State}
     */
    removeState() {
        // @ts-ignore
        return this.states.shift()
    }

    /**
     *
     * @param {import("./types").State} state
     */
    mergeState(state) {
        let prev = this.getState();
        prev.input = state.input;
        prev.nodes.push(...state.nodes);
    }

    /**
     * @param {string} name
     * @param {{
     *   matcher?: (token:import("./types").Token) => boolean
     *   save?: (token:import("./types").Token) => void
     *   tag?: string
     * }} options
     * @returns {boolean}
     */
    CONSUME(name, { matcher, save, tag } = {}) {
        this.newState();
        // @ts-ignore
        let token = this[name].call(this, this);
        let state = this.removeState();
        if (!token) return false
        if (matcher && !matcher(token)) return false
        token.token = name;
        token.tag = tag;
        save?.(token);
        state.nodes.push(token);
        this.mergeState(state);
        return true
    }

    /**
     * @param {string} name
     * @param {RegExp|string} re
     * @param {{
     *   matcher?: (token:import("./types").Token) => boolean
     *   save?: (token:import("./types").Token) => void
     *   tag?: string
     * }} options
     */
    TOKEN(name, re = name, { tag, matcher, save } = {}) {
        this.newState();
        // @ts-ignore
        this.SKIP();
        let token = this.MATCH(re);
        let state = this.removeState();
        if (!token) return false
        if (matcher && !matcher(token)) return false
        token.token = name;
        token.tag = tag;
        save?.(token);
        state.nodes.push(token);
        this.mergeState(state);
        return true
    }

    /**
     * @param {keyof this} rule
     * @param {{
     *   tag?: string | boolean
     *   name?: string
     * }} [options]
     * @returns {boolean}
     */
    RULE(rule, { tag, name } = {}) {
        // @ts-ignore
        return this.GROUP(name || rule, /** @type {?} */ (this[rule]), {
            tag: tag == true ? rule : tag || undefined,
        })
    }

    /**
     * @param {string} name
     * @param {(parser: this) => boolean} fn
     * @param {{
     *   tag?: string
     * }} [options]
     * @returns {boolean}
     */
    GROUP(name, fn, { tag } = {}) {
        this.newState();
        let result = fn.call(this, this);
        let state = this.removeState();
        if (!result) return false
        let node = {
            rule: name,
            nodes: state.nodes,
            tag: tag,
        };
        state.nodes.forEach((n) => {
            // @ts-ignore
            if (n.tag) node[n.tag] = n;
        });
        // @ts-ignore
        if (typeof result == "object") node = { ...node, ...result };
        state.nodes = [node];
        this.mergeState(state);
        return true
    }

    /**
     * @param {() => boolean} fn
     * @param {{
     *   required?: boolean
     *   name?: string
     *   tag?: string | boolean
     *   gate?: () => boolean
     * }} [options]
     */
    MANY(fn, { required = false, name, tag, gate } = {}) {
        this.newState();
        let result = !required;
        while ((gate?.() ?? true) && fn.call(this)) {
            result = true;
        }
        let state = this.removeState();
        if (!result) return false
        if (name) {
            let node = {
                rule: name,
                nodes: state.nodes,
                tag: tag ? (tag === true ? name : tag) : undefined,
            };
            // @ts-ignore
            if (typeof result == "object") node = { ...node, ...result };
            state.nodes = [node];
        }
        this.mergeState(state);
        return true
    }

    /**
     * @param {() => boolean} fn
     */
    OP(fn) {
        fn.call(this);
        return true
    }

    /**
     * @param {RegExp|string} re
     * @param {(match:RegExpMatchArray) => import("./types").Token} matcher
     */
    MATCH(
        re,
        matcher = (m) => ({
            token: "any",
            value: m[0],
            list: [...m],
            index: m.index,
            groups: m.groups,
        }),
        skip = true
    ) {
        if (skip) this.SKIP();
        let state = this.getState();
        // @ts-ignore
        let m = state.input.match(new RegExp(`^(?:${re.source || re})`));
        if (m) {
            state.input = state.input.slice(m[0].length);
            return matcher(m)
        }
    }

    SKIP() {
        return true
    }
}

class Tokenizer extends BaseParser {
    JsBlockComment = Token(/\/\*[^]*?\*\//, false)
    JsLineComment = Token(/\/\/.*/, false)
    BlockComment = Token(/###([^]*?)###/, false)
    LineComment = Token(/#(.*)/, false)
    Number = Token(/[\d_]+(\.[\d_]+)?([eE][+-]?[0-9_]+)?/)
    String = Token(/"(?:\\["\\]|[^"\\])*"|'(?:\\['\\]|[^'\\])*'/)
    Newline = Token(/\n/, false)
    Ws = Token(/[ \t]+/, false)
    Id = Token(/\w[\w\d]*/)
    Punc = Token(/[~!@#$%^&*()_+=\-[\]\\{}|;:,./<>?]/)
    EOF() {
        return this.getState().input.length === 0
    }
}

class Parser extends Tokenizer {
    SKIP(newline = false) {
        while (
            this.CONSUME("Ws") ||
            this.CONSUME("BlockComment") ||
            this.CONSUME("LineComment") ||
            this.CONSUME("JsLineComment") ||
            this.CONSUME("JsBlockComment") ||
            (newline ? this.CONSUME("Newline") : false)
        ) {}
        return true
    }

    /**
     * @param {string} input
     */
    static parse(input) {
        let parser = new Parser(input);
        parser.RULE("Program");
        if (parser.getState().input) throw new Error("Failed to parse input.")
        return parser.getState().nodes[0]
    }

    Program() {
        while (this.Statement()) {}
        return true
    }

    Statement() {
        return (
            (this.SKIP(true), true) &&
            (this.RULE("ForStat") ||
                this.RULE("AssignStat") ||
                this.RULE("ComplexStat") ||
                this.RULE("ImportStat") ||
                this.RULE("ExprStat"))
        )
    }

    Block() {
        return (
            this.CONSUME("Newline") &&
            this.MANY(() => this.CONSUME("Indent") && this.Statement())
        )
    }

    ForStat() {
        return (
            this.TOKEN("for") &&
            this.GROUP(
                "Test",
                () => this.RULE("ForArgs") && this.RULE("ExprList")
            ) &&
            this.RULE("Block")
        )
    }

    ForArgs() {
        /**
         * @type {string[]}
         */
        let declarators = [];
        let declare = (/** @type {import("./types").Token} */ token) => {
            if (!this.getState().scope.includes(token.value)) {
                this.getState().scope.push(token.value);
                declarators.push(token.value);
            }
        };
        if (
            this.CONSUME("Id", { save: declare }) &&
            this.MANY(
                () =>
                    this.TOKEN("Comma", ",") &&
                    this.OP(() => this.CONSUME("Id"))
            ) &&
            this.TOKEN("in")
        )
            return { declarators }
    }

    ComplexStat() {
        return (
            this.TOKEN("ComplexToken", /if|else|switch|catch|do|while/) &&
            this.OP(() => this.RULE("ExprList", { name: "Test" })) &&
            this.RULE("Block")
        )
    }

    ExprStat() {
        return (
            this.RULE("ExprList") &&
            this.OP(() => this.SKIP()) &&
            (this.EOF() || this.CONSUME("Newline"))
        )
    }

    ImportStat() {
        return (
            this.TOKEN("Import", "import") &&
            this.MANY(() => this.SimpleExpr(), {
                gate: () => {
                    this.newState();
                    this.SKIP();
                    let result =
                        !this.EOF() &&
                        !this.CONSUME("Newline") &&
                        !this.TOKEN("From", "from");
                    this.removeState();
                    return result
                },
                required: true,
            }) &&
            this.TOKEN("From", "from") &&
            this.CONSUME("String", { tag: "import_string" }) &&
            this.EndStat()
        )
    }

    EndStat() {
        return (
            this.OP(() => this.SKIP()) &&
            (this.EOF() || this.CONSUME("Newline"))
        )
    }

    AssignStat() {
        return (
            this.MANY(() => this.RULE("AssignExpr"), { required: true }) &&
            this.RULE("ExprList") &&
            this.EndStat()
        )
    }

    AssignExpr() {
        let expr = false;
        let id = "";
        /**
         * @type {string[]}
         */
        let declarators = [];
        let declare = (/** @type {string} */ name) => {
            if (!expr && !this.getState().scope.includes(name)) {
                this.getState().scope.push(name);
                declarators.push(name);
            }
        };
        if (
            this.MANY(
                () => {
                    return (
                        this.CONSUME("Id", {
                            save: (token) => {
                                id = token.value;
                            },
                            tag: "var",
                        }) ||
                        this.TOKEN("Comma", ",", {
                            save: () => {
                                if (id) declare(id);
                                id = "";
                                expr = false;
                            },
                        }) ||
                        (expr = this.SimpleExpr())
                    )
                },
                {
                    required: true,
                    gate: () => {
                        this.newState();
                        let result = !this.TOKEN("Assign", "=");
                        this.removeState();
                        return result
                    },
                }
            ) &&
            this.TOKEN("Assign", "=", {
                save: () => {
                    if (id) declare(id);
                },
            })
        )
            return { declarators }
    }

    ExprList() {
        return this.MANY(() => this.SimpleExpr(), {
            required: true,
            gate: () => {
                this.newState();
                this.SKIP();
                let result = !this.EOF() && !this.CONSUME("Newline");
                this.removeState();
                return result
            },
        })
    }

    SimpleExpr() {
        return (
            this.CONSUME("Number") ||
            this.CONSUME("String") ||
            this.CONSUME("Id") ||
            this.CONSUME("Punc")
        )
    }

    Indent() {
        /**
         * @type {import("./types").Token | undefined}
         */
        let token;
        while (
            this.CONSUME("Ws", { save: (tok) => (token = tok) }) ||
            this.CONSUME("BlockComment") ||
            this.CONSUME("LineComment") ||
            this.CONSUME("JsLineComment") ||
            this.CONSUME("JsBlockComment") ||
            this.CONSUME("Newline")
        ) {}

        if (!token) return false
        // @ts-ignore
        let ws = token?.value.length ?? 0;
        if (ws < this.getState().level) {
            this.getState().level = ws;
            return
        }
        if (ws > this.getState().level) {
            this.getState().level = ws;
        }
        return {
            token: "indent",
            value: token?.value,
            list: token?.list,
            hidden: true,
        }
    }
}

class ToJs {
    /**
     * @param {import("./types").Node|import("./types").Token} tree
     * @returns {any}
     */
    VISIT_SINGLE(tree) {
        // @ts-ignore
        let visitor = this[tree.rule || tree.token];
        if (!visitor) {
            // @ts-ignore
            if (tree.token) return this.TOSTR(tree)
            // @ts-ignore
            else throw new Error(`No visitor for ${tree.rule || tree.token}`)
        }
        return visitor.call(this, tree)
    }

    /**
     * @param {import("./types").Node|import("./types").Token|(import("./types").Node|import("./types").Token)[]} tree
     */
    VISIT(tree) {
        return Array.isArray(tree)
            ? tree.map((node) => this.VISIT_SINGLE(node))
            : this.VISIT_SINGLE(tree)
    }

    /**
     * @param {import("./types").Node|import("./types").Token|(import("./types").Node|import("./types").Token)[]} tree
     */
    TOSTR(tree) {
        // @ts-ignore
        return tree.token ? tree.value : this.VISIT(tree.nodes).join("")
    }

    /**
     * @param {import("./types").Node & {declarators: string[]}} tree
     */
    AssignExpr(tree) {
        return [
            tree.declarators,
                tree.nodes
                    .map((node) => {
                        if (node.token == "Assign") return "="
                        return this.TOSTR(node)
                    }, this)
                    .join(""),
        ]
    }

    /**
     * @param {import("./types").Node} tree
     */
    AssignStat(tree) {
        /**
         * @type {string[]}
         */
        let declarators = [];
        let code = tree.nodes
            .map((node) => {
                // @ts-ignore
                if (node.rule == "AssignExpr") {
                    let [decls, code] = this.AssignExpr(node);
                    declarators.push(...decls);
                    return code
                }
                return this.TOSTR(node)
            })
            .join("");
        if (declarators.length) code = "let " + declarators.join() + ";" + code;
        return code
    }

    Program = this.TOSTR

    /**
     * @param {import("./types").Node} tree
     */
    ForStat(tree) {
        /**
         * @type {string[]}
         */
        let declarators = [];
        /**
         * @type {string}
         */
        let code = "";

        code += tree.nodes
            .map((node) => {
                if (
                    /** @type {import("./types").Node} */ (node).rule ==
                    "ForArgs"
                ) {
[declarators, code] = this.VISIT(node);
                    return code
                } else return this.VISIT(node)
            })
            .join("");

        if (declarators.length) code = "let " + declarators.join() + ";" + code;
        return code
    }

    /**
     * @param {import("./types").Node} tree
     */
    ImportStat(tree) {
        return tree.nodes
            .map((node) => {
                if (node.token == "Import") return "import{"
                if (node.token == "From") return "}from"
                return this.TOSTR(node)
            })
            .join("")
    }
    /**
     * @param {import("./types").Node & {declarators: string[]}} tree
     */
    ForArgs(tree) {
        return [
            tree.declarators,
            tree.nodes
                .map((node) => {
                    if (node.token == "in") return "of"
                    return this.VISIT(node)
                })
                .join(""),
        ]
    }

    ComplexStat = this.TOSTR

    /**
     * @param {import("./types").Node} tree
     */
    Block(tree) {
        return "{" + this.TOSTR(tree).replace(/\n?$/, "}$&")
    }

    /**
     * @param {import("./types").Node} tree
     */
    Test(tree) {
        return "(" + this.TOSTR(tree) + ")"
    }

    /**
     * @param {import("./types").Node} tree
     */
    ExprStat(tree) {
        let code = tree.nodes
            .map((node) => {
                // @ts-ignore
                if (node.rule == "ExprList") return this.ExprList(node)
                return this.VISIT_SINGLE(node)
            })
            .join("");
        if (!code.endsWith("\n")) code += "\n";
        return code
    }

    ExprList = this.TOSTR

    Indent() {
        return ""
    }
    JsBlockComment = this.TOSTR
    JsLineComment = this.TOSTR
    /**
     * @param {import("./types").Token} tree
     */
    BlockComment(tree) {
        return "/*" + tree.list[1] + "*/"
    }
    /**
     * @param {import("./types").Token} tree
     */
    LineComment(tree) {
        return "//" + tree.list[1]
    }
    /**
     * @param {import("./types").Token} tree
     */
    String(tree) {
        return "`" + tree.value.slice(1, -1) + "`"
    }

    /**
     * @param {import("./types").Node | import("./types").Token | (import("./types").Node | import("./types").Token)[]} node
     */
    static visit(node) {
        let tojs = new ToJs();
        return tojs.VISIT(node)
    }

    /**
     * @param {string} code
     */
    static convert(code) {
        return ToJs.visit(Parser.parse(code))
    }
}

const parse = Parser.parse;
const tojs = ToJs.convert;

export { BaseParser, Parser, ToJs, Token, parse, tojs };
