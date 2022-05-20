/*
type: ninepatch2
name:

key: 
columns: [20, undefined, 20]
rows: [20, undefined, 20]
stretchMode:
width:
height:
preserveRatio:
maxFixedPartScale:
*/

import MergeStyle from './MergeStyle.js';
import NinePatch from '../../ninepatch2/NinePatch.js';

var CreateNinePatch = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var gameObjects = new NinePatch(scene, data);

    scene.add.existing(gameObjects);
    return gameObjects;
}
export default CreateNinePatch;