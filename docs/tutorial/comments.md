---
sidebar_position: 2
---
# Unv Comments

1. Comments can be used to explain Unv code.
2. Comments can be used to prevent execution when testing code.

## Creating a Comment

Comments starts with a #, and Unv will ignore them:

**Example**
```py
#This is a comment
print("Hello, World!")
```

Comments can be placed at the end of a line, and Unv will ignore the rest of the line:

**Example**
```py
print("Hello, World!") #This is a comment
```

A comment does not have to be text that explains the code, it can also be used to prevent Unv from executing code:

**Example**
```py
#print("Hello, World!")
print("Cheers, Mate!")
```

## Multi Line Comments

To comment in multiple lines you could insert a # for each line:

**Example**
```py
#This is a comment
#written in
#more than just one line
print("Hello, World!")
```

Or, not quite as intended, you can use a multiline comment.

**Example**
```coffee
###
This is a comment
written in
more than just one line
###
print("Hello, World!")
```
