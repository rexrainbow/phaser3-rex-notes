import { marked } from 'marked';

var GetHeadingTree = function (text) {
    var items = marked.lexer(text);

    var tree = null;
    var nodePath = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        switch (item.type) {
            case 'heading':
                var level = item.depth - 1;
                // First node
                if (tree === null) {
                    if (level === 0) {
                        var node = CreateNewNode(item.text);
                        nodePath.push(node);
                        tree = node;
                    }
                    // Ignore items if tree is null
                } else {
                    if (level <= nodePath.length) {
                        var node = CreateNewNode(item.text);
                        nodePath.length = level;
                        var lastNode = nodePath[nodePath.length - 1];
                        lastNode.children.push(node);
                        nodePath.push(node);
                    }
                    // Ignore items if out of nodePath
                }
                break;

            case 'paragraph':
            case 'code':
                if (nodePath.length === 0) {
                    continue;
                }
                // Append raw to last-node
                var lastNode = nodePath[nodePath.length - 1];
                var node = { text: item.text };
                if (item.lang) {
                    node.block = item.lang;
                }
                lastNode.paragraph.push(node);
                break;

            // Ignore other kinds of items
        }
    }

    return tree;
}

var CreateNewNode = function (title) {
    return {
        title: title,
        paragraph: [],
        children: [],
    }
}

export default GetHeadingTree;