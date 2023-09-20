import GetScene from '../../system/GetSceneObject';
import LZString from '../../lzstring/lz-string.min.js';

var FromJSON = function (container, dataList, callback, decompress) {
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

        if (isContainerScene) {
            scene.add.existing(gameObject);
        } else {
            container.add(gameObject);
        }

        gameObjects.push(gameObject);
    }

    return gameObjects;
}

export default FromJSON;