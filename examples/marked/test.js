import { marked } from 'marked';

var content = `\
# H1: xxxx

H1.Content
H1.Content
H1.Content

## H2: xxxx

H2.Content
H2.Content
H2.Content

## H3: xxxx

H3.Content
H3.Content
H3.Content


## H21: xxxx

H21.Content
H21.Content
H21.Content

`

console.log(marked.parse(content))
console.log(marked.lexer(content))
