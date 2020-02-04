import IsArray from '../../../plugins/utils/object/IsArray.js';

var GetElement = function (mapNameList) {
    if (this.childrenMap === undefined) {
        return undefined;
    }

    if (typeof (mapNameList) === 'string') {
        mapNameList = mapNameList.split('.');
    }
    if (mapNameList.length === 0) {
        return undefined;
    }

    var name = mapNameList.shift(),
        element;
    if (name.charAt(0) === '#') {
        name = name.substring(1);
        element = GetElementByName(this.childrenMap, name);
    } else if (name.indexOf('[') === (-1)) {
        element = this.childrenMap[name];
    } else { // name[]
        var innerMatch = name.match(RE_OBJ);
        if (innerMatch != null) {
            var elements = this.childrenMap[innerMatch[1]];
            if (elements) {
                element = elements[innerMatch[2]];
            }
        }
    }

    if (mapNameList.length === 0) {
        return element;
    } else if (element && element.childrenMap) {
        return element.getElement(mapNameList);
    } else {
        return null;
    }
};

var GetElementByName = function (children, name) {
    var child;
    if (IsArray(children)) {
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = TestName(children[i], name);
            if (child) {
                return child;
            }
        }
    } else { // Is plain object
        for (var key in children) {
            child = TestName(children[key], name);
            if (child) {
                return child;
            }
        }
    }
}

var TestName = function (gameObject, name) {
    if (!gameObject) {
        return null;
    } else if (gameObject.hasOwnProperty('name')) {
        return (gameObject.name === name) ? gameObject : null;
    } else { // Array, or plain object
        return GetElementByName(gameObject, name);
    }
}

const RE_OBJ = /(\S+)\[(\d+)\]/i;

export default GetElement;