import IsLayerGameObject from '../../system/IsLayerGameObject.js';
import IsContainerGameObject from '../../system/IsContainerGameObject.js';
import IsSceneObject from '../../system/IsSceneObject.js';
import LZString from '../../lzstring/lz-string.min.js';

var ToJSON = function (list, callback, compress) {
    if (compress === undefined) {
        compress = false;
    } else if (compress === true) {
        compress = 'compress';
    }

    if (IsLayerGameObject(list) || IsContainerGameObject(list)) {
        list = list.list;
    } else if (IsSceneObject(list)) {
        list = list.children;
    }

    var dataList = [];
    for (var i = 0, cnt = list.length; i < cnt; i++) {
        var gameObject = list[i];
        var data = callback(gameObject);

        if (data) {
            dataList.push(data);
        }
    }

    var result;
    if (compress) {
        result = LZString[compress](JSON.stringify(dataList));
    } else {
        result = dataList;
    }

    return result;

}

export default ToJSON;