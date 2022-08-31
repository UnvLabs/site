---
sidebar_position: 4
---

# Output Variables

## Output Variables

The Unv `print` function is often used to output variables and text

To combine both text and a variable, Unv uses the `+` character:

```py {2}
x =  "awesome"
print("Unv is "  + x)
```

You can also use the `+` character to add a variable to another variable:

```py {4}
x =  "Unv is "
y =  "awesome"
z = x + y
print(z)
```

For numbers, the `+` character works as a mathematical operator:

```py {3}
x =  5
y =  10
print(x + y)
```

If you try to combine a string and a number, It's working on some runtimes, **but it's highly discouraged.**

```py {3}
x =  5
y =  "John"
print(x + y)
```

import Support from "@theme/Support";

<Support py js/>
