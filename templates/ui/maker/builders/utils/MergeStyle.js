import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';

/*
Priority of styles : name, $class, $type
  1. name    (#name)
  2. $class  (.class)
  3. $type   (type)    
*/

var MergeStyle = function (data, styles) {
    if (styles === undefined) {
        return data;
    }

    if (data.hasOwnProperty('name')) {
        Merge(data, styles[`#${data.name}`]);
    }

    if (data.hasOwnProperty('$class')) {
        var clasKeys = data.$class.split(' ');
        for (var i = 0, cnt = clasKeys.length; i < cnt; i++) {
            Merge(data, styles[`.${clasKeys[i]}`]);
        }
    }

    if (data.hasOwnProperty('$type')) {
        Merge(data, styles[data.$type]);
    }

    return data;
}

var Merge = function (toObj, fromObj) {
    if (fromObj === undefined) {
        return toObj;
    }

    for (var key in fromObj) {
        if (!toObj.hasOwnProperty(key)) {
            // Only add nonexistent property
            toObj[key] = DeepClone(fromObj[key]);
        } else {
            var value = toObj[key];
            if (value && (typeof (value) === 'object')) {
                Merge(value, fromObj[key]);
            }
        }
    }
    return toObj;
}

export default MergeStyle;