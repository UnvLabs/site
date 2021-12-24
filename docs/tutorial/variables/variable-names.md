---
sidebar_position: 2
---
# Variable Names

## Variable Names

A variable can have a short name (like x and y) or a more descriptive name (age, carname, total_volume). Rules for Unv variables:

-   A variable name must start with a letter or the underscore character
-   A variable name cannot start with a number
-   A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ )
-   Variable names are case-sensitive (age, Age and AGE are three different variables)

### Example

Legal variable names:
```py
var myvar =  "John"  
var my_var =  "John"  
var _my_var =  "John"  
var myVar =  "John"  
var MYVAR =  "John"  
var myvar2 =  "John"
```

### Example

Illegal variable names:
```py
var 2myvar =  "John"  
var my-var =  "John"  
var my var =  "John"
```

Remember that variable names are case-sensitive

## Multi Words Variable Names

Variable names with more than one word can be difficult to read.

There are several techniques you can use to make them more readable:

## Camel Case

Each word, except the first, starts with a capital letter:
```py
var myVariableName =  "John"
```

## Pascal Case

Each word starts with a capital letter:
```py
var MyVariableName =  "John"
```

## Snake Case

Each word is separated by an underscore character:
```py
var my_variable_name =  "John"
```

> Snake Case is recommended.
