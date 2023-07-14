---
sidebar_position: 4
---

# Comments
---
Comments are used to explain code or to tell the compiler or runtime to ignore these lines. These lines are essentially ignored by the compiler or runtime.

## Creating a Comment

Comments starts with a #, and Unv will ignore them:

```py {1}
#This is a comment
print("Hello, World!")
```

Comments can be placed at the end of a line, and Unv will ignore the rest of the line:

```py {1}
print("Hello, World!") # Ignored from this point forth
```

A comment does not have to be text that explains the code, it can also be used to prevent Unv from executing code:

```py {1}
#print("Hello, World!")
print("Cheers, Mate!")
```

## Multi Line Comments

To comment in multiple lines you could insert a # for each line:

```py {1-3}
#This is a comment
#written in
#more than just one line
print("Hello, World!")
```

Or, you can use a multiline comment.

```coffee {1-5}
###
This is a comment
written in
more than just one line
###
print("Hello, World!")
```

import Support from "@theme/Support";

<Support py js/>
