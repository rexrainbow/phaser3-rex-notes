var GetElement = function (mapNameList, recursive) {
    if (typeof (mapNameList) === 'string') {
        mapNameList = mapNameList.split('.');
    }
    if (mapNameList.length === 0) {
        return undefined;
    }

    if (recursive === undefined) {
        recursive = false;
    }

    var name = mapNameList.shift(),
        element = null;
    if (name.charAt(0) === '#') { // Get element by name
        name = name.substring(1);
        element = this.getByName(name, recursive);
    } else if ((mapNameList.length === 0) && recursive) { // Get element by single key and recursive        
        var childrenMap = this.childrenMap;
        if (childrenMap) {
            var queue = [childrenMap];
            var child;
            while (queue.length) {
                childrenMap = queue.shift();

                for (var key in childrenMap) {
                    child = childrenMap[key];
                    if (key === name) {
                        element = child;
                        break;  // Leave for-loop
                    } else if (child && (typeof (child) === 'object') && child.childrenMap) {
                        queue.push(child.childrenMap);
                    }
                }

                if (element) { // leave while-loop
                    break;
                }
            }
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