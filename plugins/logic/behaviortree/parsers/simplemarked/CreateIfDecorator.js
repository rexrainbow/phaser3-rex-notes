import { If } from '../../nodes';

var CreateIfDecorator = function (nodes) {
    var condition;
    if (nodes.length > 0) {
        condition = nodes.map(function (node) {
            return `(${GetConditionString(node)})`
        }).join(' or ');
    } else {
        condition = 'true';
    }

    var ifDecorator = new If({ expression: condition });
    return ifDecorator;
}

var GetConditionString = function (node) {
    var paragraphs = node.paragraphs;
    for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
        var paragraph = paragraphs[i];
        if (paragraph.hasOwnProperty('block')) {
            continue;
        }

        var lines = paragraph.split('\n');
        return lines.map(function (line) { return `(${line})` }).join(' and ');
    }
    return 'true';
}

export default CreateIfDecorator;