import { If } from '../../behaviortree';

var CreateIfDecorator = function (nodes) {
    var condition;
    switch (nodes.length) {
        case 0:
            condition = 'true';
            break;

        case 1:
            condition = GetConditionString(nodes[0]);
            break;

        default:
            condition = nodes.map(function (node) {
                return `(${GetConditionString(node)})`
            }).join(' || ');
            break;
    }

    var ifDecorator = new If({ title: 'condition', expression: condition });
    return ifDecorator;
}

var GetConditionString = function (node) {
    var paragraphs = node.paragraphs;
    for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
        var paragraph = paragraphs[i];
        if (paragraph.hasOwnProperty('block')) {
            continue;
        }

        var lines = paragraph.text.split('\n');
        return lines.map(function (line) { return `(${line})` }).join(' && ');
    }
    return 'true';
}

export default CreateIfDecorator;