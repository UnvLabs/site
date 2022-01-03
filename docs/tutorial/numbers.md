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
Both integers and floating point numbers are asumed to be true if queried ,unless the have an e,
**SO:**
[example](https://unv.vercel.app/playground#import%20print%20from%20'standard'%0A%0Aif%206.457%0A%20%20%20%20print('Hello%20World!')%0A%23%20keep%20editing%20for%20live%20results%0A)
That works.
**BUT**
[exmaple two](https://unv.vercel.app/playground#import%20print%20from%20'standard'%0A%0Aif%206e.457%0A%20%20%20%20print('Hello%20World!')%0A%23%20keep%20editing%20for%20live%20results%0A)
this doesnt
