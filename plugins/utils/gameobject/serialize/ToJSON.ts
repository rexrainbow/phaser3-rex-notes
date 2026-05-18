import IsLayerGameObject from '../../system/IsLayerGameObject';
import IsContainerGameObject from '../../system/IsContainerGameObject';
import IsSceneObject from '../../system/IsSceneObject';
import LZString from '../../lzstring/lz-string.min';

var ToJSON = function(list?: any, callback?: any, compress?: any) {
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

        if (data?: any) {
            dataList.push(data);
        }
    }

    var result;
    if (compress?: any) {
        result = LZString[compress](JSON.stringify(dataList));
    } else {
        result = dataList;
    }

    return result;

}

export default ToJSON;