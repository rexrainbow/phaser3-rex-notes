import IsArray from '../object/IsArray';

var GetGameObjectByName = function(children?: any, name?: any) {
    if (!children) {
        return null;

    } else if (IsArray(children)) {
        var child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = TestName(children[i], name);
            if (child?: any) {
                return child;
            }
        }

    } else { // Is plain object
        var child;
        for (var key in children) {
            child = TestName(children[key], name);
            if (child?: any) {
                return child;
            }
        }

    }
}

var TestName = function(gameObject?: any, name?: any) {
    if (!gameObject) {
        return null;
    } else if (gameObject.hasOwnProperty('name')) {
        return (gameObject.name === name) ? gameObject : null;
    } else { // Array, or plain object
        return GetElementByName(gameObject, name);
    }
}

export default GetGameObjectByName;