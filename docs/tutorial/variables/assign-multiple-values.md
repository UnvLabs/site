---
sidebar_position: 3
---
# Assign Multiple Values

## Many Values to Multiple Variables

Unv allows you to assign values to multiple variables in one line:

```py
x, y, z =  "Orange",  "Banana",  "Cherry"  
print(x)  
print(y)  
print(z)
```

**Note:**  Make sure the number of variables is equal or lower than the number of values.

## One Value to Multiple Variables

And you can assign the  _same_  value to multiple variables in one line:

```py
x = y = z =  "Orange"  
print(x)  
print(y)  
print(z)
```

## Unpack a Collection

If you have a collection of values in a list, tuple etc. Unv allows you extract the values into variables. This is called  _unpacking_.

Unpack a list:
```py
fruits = ["apple",  "banana",  "cherry"]  
x, y, z = fruits  
print(x)  
print(y)  
print(z)
```
