---
sidebar_position: 1
---

# Introduction

## Variables

Variables are containers for storing data values.

## Creating Variables

Unv has no command for declaring a variable.

A variable is created the moment you first assign a value to it.

```py {1,2}
x =  5
y =  "John"
print(x)
print(y)
```

Don't change the type of variable after they have been set.

```py {2}
x =  4 # x is of type int
x =  "Sally"  # x is now a string
print(x)
# This is bad code - hanging the type of varible is NOT good practice
```

## Casting

If you want to specify the data type of a variable, this can be done with casting.

```py
x =  string(3) # x will be '3'
y =  number(3) # y will be 3
```

<!--
## Get the Type

You can get the data type of a variable with the `type()` function.

```py
import print from 'standard'

x =  5
y =  "John"
print(type(x))
print(type(y))
```
-->

## Single or Double Quotes?

String variables can be declared either by using single or double quotes:

```py {1,3}
x =  "John"
# is the same as
x =  'John'
```
There's no difference in UNV , unlike other languages.

## Yes , They are case-sensitive

Variable names are case-sensitive.

This will create two variables:

```py
a =  4
A =  "Sally"
#A will not overwrite a
```

import Support from "@theme/Support";

<Support py js/>
