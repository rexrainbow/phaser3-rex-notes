const STATE_CONDITION = 1;
const STATE_TASK = 2;
const STATE_ELSE = 3;

var ParseNodes = function (nodes) {
    var conditionNodes = [];
    var mainTaskNode = [];
    var elseNodes = [];

    var state = STATE_CONDITION;
    var nextNodeType = GetNodeType(nodes[0]);
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        var node = nodes[i];
        if (state === STATE_CONDITION) {
            if (nextNodeType === '') {
                state = STATE_TASK;
            }
        } else if (state === STATE_TASK) {
            if (nextNodeType === 'else') {
                state = STATE_ELSE
            }
        }

        switch (state) {
            case STATE_CONDITION:
                conditionNodes.push(node)
                break;

            case STATE_TASK:
                mainTaskNode.push(node);
                break;

            case STATE_ELSE:
                elseNodes.push(node);
                break;
        }

        if ((i + 1) < cnt) {
            nextNodeType = GetNodeType(nodes[i + 1]);
        }
    }

    return {
        conditionNodes: conditionNodes,
        mainTaskNode: mainTaskNode,
        elseNodes: elseNodes,
    }
}

var GetNodeType = function (node) {
    var title = node.title.toLowerCase();
    if (title.indexOf('[condition]') > -1) {
        return 'condition';
    } else if (title === '[else]') {
        return 'else';
    }
    return ''
}

export default ParseNodes;