---
sidebar_position: 3
---
# Output Variables

## Output Variables

The Unv  `print`  function is often used to output variables.

To combine both text and a variable, Unv uses the  `+`  character:

### Example
```py
var x =  "awesome"  
print("Unv is "  + x)
```

You can also use the  `+`  character to add a variable to another variable:

### Example
```py
var x =  "Unv is "  
var y =  "awesome"  
var z = x + y  
print(z)
```

For numbers, the  `+`  character works as a mathematical operator:

### Example
```py
x =  5  
y =  10  
print(x + y)
```

If you try to combine a string and a number, It's working, **but it's highly discouraged.**

### Example
```py
x =  5  
y =  "John"  
print(x + y)
```
