---
title: What are the best comments?
description: What is the best comment syntax for programming?
authors: ksengine
tags: [unv, python, c, javascript, comments]
image: comments.svg
---
Many programming languages are using comments. But they are using different syntax for it. I am going to choose the best syntax.

<!--truncate-->
![comments](comments.svg)
In computer programming, a **comment** is a programmer-readable explanation or annotation in the source code of a computer program. They are added with the purpose of making the source code easier for humans to understand, and are generally ignored by compilers and interpreters. The syntax of comments in various programming languages varies considerably.

I am creating a programming language named Unv. So I wanted to implement comments.

Vist the [Unv website](https://unv.vercel.app/docs/tutorial/comments) for more info.

There are 2 types of comments.
- inline comments
- block comments

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
C-like syntax is more popular (I think), But python comments are more clear for me. They are differ from other symbol used in code and easy to understand(with or without syntax highlighting).

So Unv comments are similar to Python.
You can try it on the [playground](https://unv.vercel.app/playground).

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
It's valid for Unv too. You can try it on the [playground](https://unv.vercel.app/playground).
But you can use a multiline string to define a block comment.
```py
"""
This is a
block
comment
"""
```
In Unv programming language, strings are always multiline. So similar code is always valid for Unv.
```py
"
This is a
block
comment
"
```
You can try it on the [playground](https://unv.vercel.app/playground#if%20'Unv%20is%20awesome!'%0A%20%20%20%20print('Hello%20World!')%0A%23%20keep%20editing%20for%20live%20results%0A%22%0AThis%20is%20a%0Ablock%0Acomment%0A%22%0A).
```coffee
###
This is a
block
comment
###
```
Oh it was already used by CoffeeScript. for Unv You can try it on the [playground](https://site-git-edit-unv.vercel.app/playground#if%20'Unv%20is%20awesome!'%0A%20%20%20%20print('Hello%20World!')%0A%23%20keep%20editing%20for%20live%20results%0A%23%23%23%0AThis%20is%20a%0Ablock%0Acomment%0A%23%23%23%0A)

They are my favourites. If you have ideas please let me know. You can contact me via ksengine.github@gmail.com . 
