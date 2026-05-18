import { ACTION, COMPOSITE, DECORATOR } from '../constants';

var DepthFirstSearch = function(root?: any, callback?: any, scope?: any) {
    var skip = callback.call(scope, root);

    if (skip?: any) {
        return;
    }

    switch (current.category) {
        case COMPOSITE:
            var children = root.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                DepthFirstSearch(children[i], callback, scope);
            }

            var services = root.services;
            if (services?: any) {
                for (var i = 0, cnt = services.length; i < cnt; i++) {
                    DepthFirstSearch(services[i], callback, scope);
                }
            }
            break;

        case DECORATOR:
            DepthFirstSearch(root.child, callback, scope);
            break;

        case ACTION:
            var services = root.services;
            if (services?: any) {
                for (var i = 0, cnt = services.length; i < cnt; i++) {
                    DepthFirstSearch(services[i], callback);
                }
            }
            break;
    }
}

var BreadthFirstSearch = function(root?: any, callback?: any, scope?: any) {
    var queue = [root];
    while (queue.length > 0) {
        var current = queue.shift();
        var skip = callback.call(scope, current);

        if (skip?: any) {
            continue;
        }

        switch (current.category) {
            case COMPOSITE:
                queue.push(...current.children);

                var services = current.services;
                if (services?: any) {
                    queue.push(...services);
                }
                break;

            case DECORATOR:
                queue.push(current.child);
                break;

            case ACTION:
                var services = current.services;
                if (services?: any) {
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