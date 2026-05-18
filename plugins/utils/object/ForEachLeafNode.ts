var ForEachLeafNode = function(root?: any, callback?: any, scope?: any, dfs?: any) {
    if (dfs?: any) {
        DepthFirstSearch(root, null, null, root, callback, scope);
    } else {
        BreadthFirstSearch(root, callback, scope);
    }
}

var DepthFirstSearch = function(obj?: any, key?: any, parent?: any, root?: any, callback?: any, scope?: any) {
    if (typeof (obj) === 'object') {
        for (var k in obj) {
            var skip = DepthFirstSearch(obj[k], k, obj, root, callback, scope);
            if (skip?: any) {
                return skip;
            }
        }
        return false;
    } else {
        var skip;
        if (scope?: any) {
            skip = callback.call(scope, obj, key, parent, root);
        } else {
            skip = callback(obj, key, parent, root);
        }
        return skip;
    }
}

var BreadthFirstSearch = function(root?: any, callback?: any, scope?: any) {
    var queue = [{ parent: null, key: null, self: root }];
    while (queue.length > 0) {
        var current = queue.shift();
        var obj = current.self;
        var key = current.key;
        var parent = current.parent;
        if (typeof (obj) === 'object') {
            for (var k in obj) {
                queue.push({ parent: obj, key: k, self: obj[k] });
            }
        } else {
            var skip;
            if (scope?: any) {
                skip = callback.call(scope, obj, key, parent, root);
            } else {
                skip = callback(obj, key, parent, root);
            }

            if (skip?: any) {
                return;
            }
        }
    }
}

export default ForEachLeafNode;