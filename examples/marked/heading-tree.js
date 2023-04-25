import GetHeadingTree from '../../plugins/utils/marked/headingtree/GetHeadingTree.js';

var content = `\
# H1: xxxx

*H1.Content*
H1.Content
H1.Content

## H2: xxxx

|||talk
H2.Content
H2.Content
H2.Content
|||

### H3: xxxx

H3.Content
H3.Content
H3.Content


## H21: xxxx

H21.Content
H21.Content
H21.Content

`

content = content.replaceAll('|', '`');

console.log(JSON.stringify(GetHeadingTree(content)));
