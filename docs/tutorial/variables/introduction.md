---
sidebar_position: 1
---

# Introduction

## Variables

Variables are containers for storing data values.

## Creating Variables

Unv has no command for declaring a variable.

A variable is created the moment you first assign a value to it.

### Example

```py
import print from 'standard'

x =  5
y =  "John"
print(x)
print(y)
```

Don't change the type of variable after they have been set.

### Example

```py
import print from 'standard'

x =  4 # x is of type int
x =  "Sally"  # x is now of type str
print(x)
# Bad code
```

## Casting

If you want to specify the data type of a variable, this can be done with casting.

### Example

```py
x =  string(3) # x will be '3'
y =  number(3) # y will be 3
```

## Get the Type

You can get the data type of a variable with the `type()` function.

### Example

```py
import print from 'standard'

x =  5
y =  "John"
print(type(x))
print(type(y))
```

## Single or Double Quotes?

String variables can be declared either by using single or double quotes:

### Example

```py
x =  "John"
# is the same as
x =  'John'
```

## Case-Sensitive

Variable names are case-sensitive.

### Example

This will create two variables:

```py
a =  4
A =  "Sally"
#A will not overwrite a
```

import Support from "@theme/Support";

<Support py js/>

