import { COMPOSITE, DECORATOR } from '../constants.js';

var DepthFirstSearch = function (root, callback) {
    var skip = callback(root);

    if (skip) {
        return;
    }

    switch (current.category) {
        case COMPOSITE:
            var children = root.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                DepthFirstSearch(children[i], callback);
            }
            break;

        case DECORATOR:
            DepthFirstSearch(root.child, callback);
            break;
    }
}

var BreadthFirstSearch = function (root, callback) {
    var queue = [root];
    while (queue.length > 0) {
        var current = queue.shift();
        var skip = callback(current);

        if (skip) {
            continue;
        }

        switch (current.category) {
            case COMPOSITE:
                queue.push(...current.children);
                break;

            case DECORATOR:
                queue.push(current.child);
                break;
        }
    }
}

export {
    DepthFirstSearch,
    BreadthFirstSearch
};