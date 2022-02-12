---
sidebar_position: 3
---
# Modify Strings

Unv has a set of built-in module named `string` with useful methods that you can use on strings.

## Upper Case

The  `uppercase()`  method returns the string in upper case:

```py
import uppercase from "string"

a =  "Hello, World!"  
print(uppercase(a))
```

## Lower Case

The  `lowercase()`  method returns the string in lower case:

```py
import lowercase from "string"

a =  "Hello, World!"  
print(lowercase(a))
```

## Remove Whitespace

Whitespace is the space before and/or after the actual text, and very often you want to remove this space.

The  `trim()`  method removes any whitespace from the beginning or the end:

```py
import trim from "string"

a =  " Hello, World! "  
print(trim(a))  # returns "Hello, World!"
```

## Replace String

The  `replace()`  method replaces a string with another string:

```py
import replace from "string"

a =  "Hello, World!"  
print(replace(a, "H",  "J"))
```

## Split String

The  `split()`  method returns a list where the text between the specified separator becomes the list items.

The  `split()`  method splits the string into substrings if it finds instances of the separator:

```py
import split from "string"

a =  "Hello, World!"  
print(split(a, ","))  # returns ['Hello', ' World!']
```
