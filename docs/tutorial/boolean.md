---
sidebar_position: 10
---
# Booleans

Booleans represent one of two values:  `true`  or  `false`.

## Boolean Values

In programming you often need to know if an expression is  `true`  or  `false`.

You can evaluate any expression in Unv, and get one of two answers,  `true`  or  `false`.

When you compare two values, the expression is evaluated and Unv returns the Boolean answer:

```py
print(10  >  9)  
print(10  ==  9)  
print(10  <  9)
```

When you run a condition in an if statement, Unv returns  `true`  or  `false`:

Print a message based on whether the condition is  `True`  or  `False`:
```py
a =  200  
b =  33  
  
if  b > a
    print("b is greater than a")  
else
    print("b is not greater than a")
```

## Evaluate Values and Variables

The  `boolean()`  function allows you to evaluate any value, and give you  `true`  or  `false`  in return,

Evaluate a string and a number:
```py
print(boolean("Hello"))  
print(boolean(15))  
```

Evaluate two variables:
```py
x =  "Hello"  
y =  15  
  
print(boolean(x))  
print(boolean(y))  
```

## Functions can Return a Boolean

You can create functions that returns a Boolean Value:


Print the answer of a function:
```py
function  myFunction()
    return  true  
  
print(myFunction())
```

You can execute code based on the Boolean answer of a function:

Print "YES!" if the function returns True, otherwise print "NO!":
```py
function  myFunction() 
    return  true  
  
if  myFunction()
    print("YES!")  
else
    print("NO!")
```

<!--
Unv also has many built-in functions that return a boolean value, like the  `isinstance()`  function, which can be used to determine if an object is of a certain data type:

Check if an object is an integer or not:
```py
x =  200  
print(isinstance(x, number))
```
-->

import Support from "@theme/Support";

<Support py js/>