var GetElement = function (mapNameList) {
    if (typeof (mapNameList) === 'string') {
        mapNameList = mapNameList.split('.');
    }
    if (mapNameList.length === 0) {
        return undefined;
    }
    var name = mapNameList.shift(),
        element;
    if (name.charAt(0) === '#') {
        element = this.getByName(name.substring(1));
    } else if (name.indexOf('[') === (-1)) {
        element = this.childrenMap[name];
    } else { // name[]
        // TODO:
    }

    if (mapNameList.length === 0) {
        return element;
    } else if (element && element.childrenMap) {
        return element.GetElement(mapNameList);
    }
};

export default GetElement;