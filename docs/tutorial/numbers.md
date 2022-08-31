---
sidebar_position: 7
---

# Numbers

There are three numeric types in Unv:

-   `int`
-   `float`(= `number`)
-   `complex`

Variables of numeric types are created when you assign a value to them:

```py
x =  1 # int  
y =  2.8 # float  
```
<!--
To verify the type of any object in Unv, use the  `type()`  function:

```py
print(type(x))  
print(type(y))  
print(type(z))  
```
-->

## Int

Int, or integer, is a whole number, positive or negative, without decimals, of unlimited length.

Integers:
```py
x =  1  
y =  35656222554887711  
z =  -3255522
```

## Float/Number

Float, or "floating point number" is a number, positive or negative, containing one or more decimals.

Floats:
```py
x =  1.10  
y =  1.0  
z = -35.59  
```

Float can also be scientific numbers with an "e" to indicate the power of 10.

Floats:
```py
x =  35e3  
y =  12E4  
z = -87.7e100  
```
<!-- 
## Complex

Complex numbers are written with a "j" as the imaginary part:

Complex:
```py
x =  3+5j  
y = 5j  
z = -5j  
``` -->

## Type Conversion

You can convert from one type to another with the  `int()` and  `float()`(=`number()`)  methods:

Convert from one type to another:
```py
x =  1 # int  
y =  2.8 # float  
z = 1j # complex  
  
#convert from int to float:  
a =  float(x)  
#convert from int to number:  
b =  number(x)  

#convert from float to int:  
c =  int(y)  

print(a)  
print(b)  
print(c)  
```

**Note:**  You cannot convert complex numbers into another number type.

## Random Number
Unv does not have a `random()` function to make a random number, but Unv has a built-in module called `random` that can be used to make random numbers:

Import the random module, and display a random number:

```py
import random from "@std/random"

print(random())
```

import Support from "@theme/Support";

<Support py js/>
