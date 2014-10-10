---
title: Custom Templates
subtitle: Using pandoc for technical documentation
author: Michael Henderson
date: 2014-05-31
version: 0.1
tags: [ pandoc, examples ]
abstract: |
  This is the abstract.

  It can have multiple paragraphs, but not for docx.
  
references:
- id: spec
  type: article
  title: Intefration Profiles
  short-short: IHI TF-1
  container-title: IHE IT Infrastructure Technical Framework
  version: 10.1
  issued: 
    year: 2014
    month: 10
    day: 25
  author:
  - literal: IHE International, Inc.
  URL: 'http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol1.pdf'
- id: site
  type: webpage
  title: Configuring Ensemble Productions
  container-title: Online Documentation
  author:
  - literal: InterSystems Corp.
  version: 2014.1
  URL: 'http://docs.intersystems.com/ens20141/csp/docbook/DocBook.UI.Page.cls?KEY=ECONFIG'
  accessed:
    year: 2014
    month: 5
    day: 31
...

# Typography

## Paragraph

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Inline

### Styles

This is _italic_ text. 
This is **bold** text. 
This is ~~struck~~ text.
This is a H~2~O subscript.
This is a 2^10^ superscript.

### Smart

Using `--smart` will typographically correct output. Such as "double" and 'single' curly, same for a'pos, em --, en ---, and ...

### Links

There are automatic links: <http://example.com> <joe@example.com>

Inline link to [xkcd](http://xkcd.com "a webcomic")

Here is an explicit [link][explicit]. Here is an implicit link to [pandoc].

[explicit]: /foo/bar.html  "My title, optional"
[pandoc]: http://johnmacfarlane.net/pandoc 'a universal document converter'

### Internal

Here is a link to the [Tables](#tables) chapter.

### Images

An inline picture ![alt text](small.jpg "Go Badgers!")

![A picture with a caption](sample.jpg)


## Quotations

> No matter what we threw at them, J2 was able to deliver.
>
> _Steven Beal_


## Line Blocks

Useful for anything needing spaces and lines preserved.

| 2 Thirteenth Street
| Charlestown, MA 02129

## Headers

H2

### All

H3

#### The

H4 

##### Way

H5

###### Down

H6

## Rulers

one

* * * *

two

---------


## Syntax Highlighting

### Inline

Just some plain `verbatim` text.

A simple program `console.log("hello");`{.javascript} displayed inline.

### Block

Some code...

```javascript
// A simple program displayed as a block
function hello(count) {
  for (var i = 0; i < count; i++) {
    console.log('hello' + "world");
  }
  return true;
}
```

Just for fun...

```
       _ _______           _                           _ 
      | |______ \ _ ____ _| |_ _____  ________  ____ _| |_ _ _   _ _____ 
      | |  ____) ) |  _ (_   _) ___ |/ __|___ |/ ___|_   _) | | | | ___ |
      | | / ____/| | | | || |_| ____| | / ___ ( (___  | |_| |\ V /| ____|
  ____| || (_____|_|_| |_| \__)_____)_| \_____|\____)  \__)_| \_/ |_____)
 (_____/ |_______________________________________________________________
```

#### Monospace Ruler{.unnumbered}

This isn't included in the TOC since it is a level 4 header. It shouldn't be numbered either.

```
1 3 5 7 9 1 3 5 7 9 1 3 5 7 9 1 3 5 7 9 1 3 5 7 9 1 3 5 7 9 1 3 5 7 9 1 3 5 7 9 1 3 5 7 9 1 3 5 7 9
 2 4 6 8 0 2 4 6 8 0 2 4 6 8 0 2 4 6 8 0 2 4 6 8 0 2 4 6 8 0 2 4 6 8 0 2 4 6 8 0 2 4 6 8 0 2 4 6 8 
         1         2         3         4         5         6         7         8         9
```

# Lists

## Unordered

#### Compact

* one
* two
* three

#### Loose

* one

* two

* three

#### Hanging

* The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The
quick brown fox jumped over the lazy dog. 

* The cow jumped over the moon. The cow jumped over the moon. The cow jumped over the moon. The cow
jumped over the moon. The cow jumped over the moon.

#### Multiple Paragraphs

Follow the 4-space (or tab) rule and separate with blank line.

  * First paragraph

    Second paragraph. It looks best to keep them aligned.

  * Another bullet

#### Nested

* fruits
    + apples
        - macintosh
        - red delicious
    + pears
    + peaches
* vegetables
    + broccoli
    + chard

## Ordered

1. one
2. two
3. three

### Fancy

1) one
2) two
3) three

1. one
2. two
    i. force
        a) alpha
        b) sequence
    ii. roman
        (X) upcase
        (Y) TOO
    iii. numbering

## Definition

### Block oriented

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

### Compact

Term 1
  ~ Definition 1

Term 2
~   Definition 2a

    Definition 2b

## Example Lists

A running list of sequentially numbered examples. Shame only one per doc.

(@)  My first example will be numbered (1).
(@good)  My second example will be numbered (2).

Explanation of examples.

(@)  My third example will be numbered (3).

As (@good) illustrates, we can refer to example lists.


# Tables

## Simple

  Right     Left     Center     Default
-------     ------ ----------   -------
     12     12        12            12
    123     123       123          123
      1     1          1             1

Table:  Demonstration of simple table syntax.

## Multiline

-------------------------------------------------------------
 Centered   Default           Right Left
  Header    Aligned         Aligned Aligned
----------- ------- --------------- -------------------------
   First    row                12.0 Example of a row that
                                    spans multiple lines.

  Second    row                 5.0 Here's another one. Note
                                    the blank line between
                                    rows.
-------------------------------------------------------------

Table: Here's the caption. It, too, may span
multiple lines.

## Grid

Table: Sample grid table.

+---------------+---------------+--------------------+
| Fruit         | Price         | Advantages         |
+===============+===============+====================+
| Bananas       | $1.34         | - built-in wrapper |
|               |               | - bright color     |
+---------------+---------------+--------------------+
| Oranges       | $2.10         | - cures scurvy     |
|               |               | - tasty            |
+---------------+---------------+--------------------+

## Pipe

| Right | Left | Default | Center |
|------:|:-----|---------|:------:|
|   12  |  12  |    12   |    12  |
|  123  |  123 |   123   |   123  |
|    1  |    1 |     1   |     1  |

Table: Demonstration of pipe table syntax.

# Misc

## Citations

Testing [@spec] cite [@site].

## Footnotes.

The following section provides sample equations.^[`HTML` output uses _MathML_ for modern browsers]

## Math

$a^2 + b^2 = c^2$

$v(t) = v_0 + \frac{1}{2}at^2$

$\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$

$\exists x \forall y (Rxy \equiv Ryx)$

$p \wedge q \models p$

$\Box\diamond p\equiv\diamond p$

$\int_{0}^{1} x dx = \left[ \frac{1}{2}x^2 \right]_{0}^{1} = \frac{1}{2}$

$e^x = \sum_{n=0}^\infty \frac{x^n}{n!} = \lim_{n\rightarrow\infty} (1+x/n)^n$

# References
