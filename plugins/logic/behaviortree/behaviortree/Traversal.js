import { ACTION, COMPOSITE, DECORATOR } from '../constants.js';
import IsNodeLike from '../utils/IsNodeLike.js';

var ForEachExpression = function (expressions, callback, scope) {
    if (Array.isArray(expressions)) {
        for (var i = 0, cnt = expressions.length; i < cnt; i++) {
            callback.call(scope, expressions[i], i);
        }

    } else {
        for (var name in expressions) {
            if (Object.prototype.hasOwnProperty.call(expressions, name)) {
                callback.call(scope, expressions[name], name);
            }
        }
    }
}

var DepthFirstSearch = function (root, callback, scope) {
    var skip = callback.call(scope, root);

    if (skip) {
        return;
    }

    var expressions = root.expressions;
    if (expressions) {
        ForEachExpression(expressions, function (expression) {
            if (IsNodeLike(expression)) {
                DepthFirstSearch(expression, callback, scope);
            }
        });
    }

    switch (root.category) {
        case COMPOSITE:
            var children = root.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                DepthFirstSearch(children[i], callback, scope);
            }

            var services = root.services;
            if (services) {
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
            if (services) {
                for (var i = 0, cnt = services.length; i < cnt; i++) {
                    DepthFirstSearch(services[i], callback, scope);
                }
            }
            break;
    }
}

var BreadthFirstSearch = function (root, callback, scope) {
    var queue = [root];
    while (queue.length > 0) {
        var current = queue.shift();
        var skip = callback.call(scope, current);

        if (skip) {
            continue;
        }

        var expressions = current.expressions;
        if (expressions) {
            ForEachExpression(expressions, function (expression) {
                if (IsNodeLike(expression)) {
                    queue.push(expression);
                }
            });
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
    ForEachExpression,
    DepthFirstSearch,
    BreadthFirstSearch
};
