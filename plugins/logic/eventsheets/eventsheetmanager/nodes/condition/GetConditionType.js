var GetConditionType = function (node) {
    if (node.name === 'IfSelector') {
        return 'sheet';
    }

    var parent = node.parent;
    var parentTitle = parent && parent.title;
    if (parentTitle === '[if]') {
        return 'branch';
    }

    if (parentTitle === '[while]') {
        return 'while';
    }

    if (parent && parent.parent && (parent.parent.title === '[for]')) {
        return 'for';
    }

    var child = node.child;
    if (child && (child.name === 'TaskAction')) {
        return 'embedded';
    }

    return 'condition';
}

export default GetConditionType;
