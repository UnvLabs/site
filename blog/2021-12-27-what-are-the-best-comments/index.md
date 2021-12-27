---
title: What are the best comments?
description: What is the best comment syntax for programming?
authors: ksengine
tags: [unv, python, c, javascript, comments]
image: comments.svg
---
Many programming languages are using comments. But they are using different syntax for it. I am going to choose the best syntax.

<!--truncate-->
[comments](comments.svg)
In computer programming, a **comment** is a programmer-readable explanation or annotation in the source code of a computer program. They are added with the purpose of making the source code easier for humans to understand, and are generally ignored by compilers and interpreters. The syntax of comments in various programming languages varies considerably.

I am creating a programming language named Unv. So I wanted to implement comments.

Vist the [Unv website](https://unv.vercel.app/docs/tutorial/comments) for more info.

Comments can be classified by:

-   style (inline/block)
-   parse rules (ignored/interpolated/stored in memory)
-   recursivity (nestable/non-nestable)
-   uses (docstrings/throwaway comments/other)

## Inline comments

Inline comments are generally those that use a  newline  character to indicate the end of a comment, and an arbitrary  delimiter  or sequence of  tokens  to indicate the beginning of a comment.

C like languages are using double slashes to define an inline comment.
```c
// This is an inline comment
```
Python is using a `#` sign to define it.
```py
# This is an inline comment
```
C-like syntax is more popular (I think), But python comments are more clear for me. They are differ from other symbol used in code and easy to understand(with or without syntax highlighting). Please write your thoughts as comments.

## Block comments
Block comments are generally those that use a delimiter to indicate the beginning of a comment, and another delimiter to indicate the end of a comment. In this context, whitespace and newline characters are not counted as delimiters.

C-like languages are using  `/*` mark to start a block comment and a `*/` mark to end it.
```c
/*
 This is a block comment
*/
```
In python normally you should use many inline comments to define a block comment.
```py
# This is a
# block
# comment
```
But you can use a multiline string to define a block comment.
```py
"""
This is a
block
comment
"""
```
In Unv programming language, strings are always multiline. So I had created a new syntax,
```coffee
###
This is a
block
comment
###
```
Oh it was used by CoffeeScript.

They are my favourites. If you have ideas please let me know. You can contact me via ksengine.github@gmail.com . 
