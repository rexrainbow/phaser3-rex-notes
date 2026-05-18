import GetScene from '../../system/GetSceneObject';
import LZString from '../../lzstring/lz-string.min';

var FromJSON = function(container?: any, dataList?: any, callback?: any, decompress?: any) {
    if (typeof (dataList) === 'string') {
        if ((decompress === undefined) || (decompress === true)) {
            decompress = 'decompress';
        }

        dataList = LZString[decompress](dataList);
    }

    var scene = GetScene(container);
    var isContainerScene = (container === scene);

    var gameObjects = [];
    for (var i = 0, cnt = dataList.length; i < cnt; i++) {
        var gameObject = callback(scene, dataList[i], gameObjectClass);

        if (isContainerScene?: any) {
            scene.add.existing(gameObject);
        } else {
            container.add(gameObject);
        }

        gameObjects.push(gameObject);
    }

    return gameObjects;
}

export default FromJSON;