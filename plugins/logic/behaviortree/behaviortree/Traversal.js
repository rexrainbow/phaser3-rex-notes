import { ACTION, COMPOSITE, DECORATOR } from '../constants.js';

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

            var services = root.services;
            if (services) {
                for (var i = 0, cnt = services.length; i < cnt; i++) {
                    DepthFirstSearch(services[i], callback);
                }
            }
            break;

        case DECORATOR:
            DepthFirstSearch(root.child, callback);
            break;

        case ACTION:
            var services = root.services;
            if (services) {
                for (var i = 0, cnt = services.length; i < cnt; i++) {
                    DepthFirstSearch(services[i], callback);
                }
            }
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

                var services = current.services;
                if (services) {
                    queue.push(...services);
                }
                break;

            case DECORATOR:
                queue.push(current.child);
                break;

            case ACTION:
                var services = current.services;
                if (services) {
                    queue.push(...services);
                }
                break;
        }
    }
}

export {
    DepthFirstSearch,
    BreadthFirstSearch
};