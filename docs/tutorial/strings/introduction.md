---
sidebar_position: 1
---

# Introduction

## Strings

Strings in unv are surrounded by either single quotation marks, or double quotation marks.

`'hello'`  is the same as  `"hello"`.

You can display a string literal with the  `print()`  function:

```py
print("Hello")  
print('Hello')
```

## Assign String to a Variable

Assigning a string to a variable is done with the variable name followed by an equal sign and the string:

```py
a =  "Hello"  
print(a)
```

## Multiline Strings

In Unv string can be multiline.

You can use double quotes:

```py
a =  "Lorem ipsum dolor sit amet,  
consectetur adipiscing elit,  
sed do eiusmod tempor incididunt  
ut labore et dolore magna aliqua."
print(a)
```

Or single quotes:

```py
a =  'Lorem ipsum dolor sit amet,  
consectetur adipiscing elit,  
sed do eiusmod tempor incididunt  
ut labore et dolore magna aliqua.'  
print(a)
```

**Note:**  in the result, the line breaks are inserted at the same position as in the code.

## Strings are Arrays

Like many other popular programming languages, strings in Unv are arrays of bytes representing unicode characters.

However, currently Unv does not have a character data type, a single character is simply a string with a length of 1.

Square brackets can be used to access elements of the string.

Get the character at position 1 (remember that the first character has the position 0):

```py
a =  "Hello, World!"  
print(a[1])
```

## Looping Through a String

Since strings are arrays, we can loop through the characters in a string, with a  `for`  loop.

Loop through the letters in the word "banana":
```py
for  x  in  "banana":  
    print(x)
```

## String Length

To get the length of a string, use the  `length()`  function from `string` package.

The  `length()`  function returns the length of a string:
```py
import length from "strings"

a =  "Hello, World!"  
print(length(a))
```

## Check String

To check if a certain phrase or character is present in a string, we can use the keyword  `in`.

Check if "free" is present in the following text:
```py
txt =  "The best things in life are free!"  

print("free"  in  txt)  
```

Use it in an  `if`  statement:

Print only if "free" is present:
```py
txt =  "The best things in life are free!"  

if  "free"  in  txt:  
    print("Yes, 'free' is present.")
```

## Check if NOT

To check if a certain phrase or character is NOT present in a string, we can use the keyword  `not in`.

Check if "expensive" is NOT present in the following text:
```py
txt =  "The best things in life are free!"  
print("expensive"  not  in  txt)
```

Use it in an  `if`  statement:

print only if "expensive" is NOT present:
```py
txt =  "The best things in life are free!"  

if  "expensive"  not  in  txt:  
    print("No, 'expensive' is NOT present.")
```
