---
sidebar_position: 3
---
# Variables

## Variables

Variables are containers for storing data values.

## Creating Variables

Unv use `var` command for declaring a variable.

### Example
```py
var x =  5  
var y =  "John"  
print(x)  
print(y)
```

Don't change the type of variable after they have been set.

### Example
```py
var x =  4 # x is of type int  
var x =  "Sally"  # x is now of type str  
print(x)
# Bad code
```

## Casting

If you want to specify the data type of a variable, this can be done with casting.

### Example
```py
var x =  string(3) # x will be '3'  
var y =  number(3) # y will be 3  
```

## Get the Type

You can get the data type of a variable with the  `type()`  function.

### Example
```py
var x =  5  
var y =  "John"  
print(type(x))  
print(type(y))
```

## Single or Double Quotes?

String variables can be declared either by using single or double quotes:

### Example
```py
var x =  "John"  
# is the same as  
var x =  'John'
```

## Case-Sensitive

Variable names are case-sensitive.

### Example

This will create two variables:
```py
var a =  4  
var A =  "Sally"  
#A will not overwrite a
```
