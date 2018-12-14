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
        var elements = GetAllElements(this.childrenMap, tmpArray);
        for (var i = 0, cnt = elements.length; i < cnt; i++) {
            if (elements[i].name === name) {
                element = elements[i];
                break;
            }
        }
        tmpArray.length = 0;
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

var GetAllElements = function (children, out) {
    if (out === undefined) {
        out = [];
    }
    var child;
    for (var key in children) {
        child = children[key];
        if (child.name !== undefined) {
            out.push(child);
        } else {
            GetAllElements(child, out);
        }
    }
    return out;
}

const RE_OBJ = /(\S+)\[(\d+)\]/i;
var tmpArray = [];

export default GetElement;