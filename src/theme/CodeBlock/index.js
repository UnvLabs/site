import OriginalCodeBlock from "@theme-original/CodeBlock";

export default function CodeBlock(props) {
  props.title = props.title || (
    <a
      href={
        "/playground#" +
        encodeURIComponent(
          Array.isArray(props.children)
            ? props.children.join("")
            : props.children
        )
      }
    >
      Open in playground
    </a>
  );
  return <OriginalCodeBlock {...props} />;
}
