---
sidebar_position: 2
---

# Slicing Strings

## Slicing

You can return a range of characters by using the `slice` function.

Get the characters from position 2 to position 5 (not included):

```py
import slice from "strings"

b =  "Hello, World!"  
print(slice(b, from=2, to=5))
```

**Note:** The first character has index 0.

## Slice From the Start

By leaving out the _start_ index, the range will start at the first character:

Get the characters from the start to position 5 (not included):

```py
import slice from "strings"

b =  "Hello, World!"  
print(slice(b, to=5))
```

## Slice To the End

By leaving out the  _end_ index, the range will go to the end:

Get the characters from position 2, and all the way to the end:

```py
import slice from "strings"

b =  "Hello, World!"  
print(slice(b, from=2))
```

## Negative Indexing

Use negative indexes to start the slice from the end of the string:

Get the characters:

From: "o" in "World!" (position -5)

To, but not included: "d" in "World!" (position -2):

```py
import slice from "strings"

b =  "Hello, World!"  
print(slice(b, from=-5, to=-2))
```
