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

The  `bool()`  function allows you to evaluate any value, and give you  `true`  or  `false`  in return,

Evaluate a string and a number:

```py
print(bool("Hello"))  
print(bool(15))  
```

Evaluate two variables:
```py
x =  "Hello"  
y =  15  
  
print(bool(x))  
print(bool(y))  
```

## Most Values are True

Almost any value is evaluated to  `true`  if it has some sort of content.

Any string is  `true`, except empty strings.

Any number is  `true`, except  `0`.

Any list, tuple, set, and dictionary are  `true`, except empty ones.

The following will return True:

```py
bool("abc")  
bool(123)  
bool(["apple",  "cherry",  "banana"])  
```

## Some Values are False

In fact, there are not many values that evaluate to  `false`, except empty values, such as  `()`,  `[]`,  `{}`,  `""`, the number  `0`, and the value  `None`. And of course the value  `false`  evaluates to  `false`.

The following will return False:

```py
bool(False)  
bool(None)  
bool(0)  
bool("")  
bool(())  
bool([])  
bool({})
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

<!-- Unv also has many built-in functions that return a boolean value, like the  `isinstance()`  function, which can be used to determine if an object is of a certain data type:

Check if an object is an integer or not:

```py
x =  200  
print(isinstance(x,  int))
``` -->

## Exercises

The statement below would print a Boolean value, which one?
```py
print(10 > 9)
```

import Support from "@theme/Support";

<Support py js/>