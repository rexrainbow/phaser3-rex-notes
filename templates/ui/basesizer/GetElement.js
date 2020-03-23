
import GetGameObjectByName from '../utils/GetGameObjectByName.js';

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
        element = GetGameObjectByName(this.childrenMap, name);
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

const RE_OBJ = /(\S+)\[(\d+)\]/i;

export default GetElement;