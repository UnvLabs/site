---
sidebar_position: 4
---
# Numbers

Variables of numeric types are created when you assign a value to them:

**Integers**

```py
x =  1  
y =  35656222554887711  
z =  -3255522  
```

**Floating point numbers**

```py
x =  1.10  
y =  1.0  
z = -35.59  
```

Float can also be scientific numbers with an "e" to indicate the power of 10.

```py
x =  35e3  
y =  12e4  
z = -87.7e100  
```
Both integers and floating point numbers except `0` are assumed to be `true` if queried.
```py
print(boolean(234)) # => true
print(boolean(0)) # => false
```py

