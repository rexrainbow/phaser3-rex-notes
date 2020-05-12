
import GetGameObjectByName from '../utils/GetGameObjectByName.js';

var GetElement = function (mapNameList) {
    if (typeof (mapNameList) === 'string') {
        mapNameList = mapNameList.split('.');
    }
    if (mapNameList.length === 0) {
        return undefined;
    }

    var name = mapNameList.shift(),
        element = null;
    if (name.charAt(0) === '#') {
        name = name.substring(1);
        element = GetGameObjectByName(this.childrenMap, name);  // Find in childrenMap (BaseSizer)
        if (!element) {
            element = GetGameObjectByName(this.children, name); // Find in children (ContainerLite)
        }
    } else if (name.indexOf('[') === (-1)) { // Get element by key
        if (this.childrenMap) {
            element = this.childrenMap[name];
        }
    } else { // Get element by key[]
        var innerMatch = name.match(RE_OBJ);
        if (innerMatch != null) {
            if (this.childrenMap) {
                var elements = this.childrenMap[innerMatch[1]];
                if (elements) {
                    element = elements[innerMatch[2]];
                }
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