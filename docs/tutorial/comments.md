---
sidebar_position: 2
---
# Comments
---
Comments are used to explain code or to tell the compiler or runtime to ignore these lines.Thses lines are esentially invisible to the compiler or runtime.

## Creating a Comment

Comments starts with a #, and Unv will ignore them:

**Example**
```py {1}
#This is a comment
```

Comments can be placed at the end of a line, and Unv will ignore the rest of the line:

**Example**
```py
import print from 'standard'

print("Hello, World!") # Ignored from this point forth
```

A comment does not have to be text that explains the code, it can also be used to prevent Unv from executing code:

**Example**
```py {1}
import print from 'standard'

#print("Hello, World!")
print("Cheers, Mate!")
```

## Multi Line Comments

To comment in multiple lines you could insert a # for each line:

**Example**
```py {1-3}
import print from 'standard'

#This is a comment
#written in
#more than just one line
print("Hello, World!")
```

Or, you can use a multiline comment.

**Example**
```coffee {1-5}
import print from 'standard'

###
This is a comment
written in
more than just one line
###
print("Hello, World!")
```
