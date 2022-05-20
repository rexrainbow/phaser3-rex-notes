/*
type: ninepatch
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

import GetConfig from './GetConfig.js';
import NinePatch from '../../ninepatch/NinePatch.js';

var CreateNinePatch = function (scene, config, styles, customBuilders) {
    config = GetConfig(config, styles);

    var gameObjects = new NinePatch(scene, config);

    scene.add.existing(gameObjects);
    return gameObjects;
}
export default CreateNinePatch;