import CoreScriptFileCallback from './gameobjects/live2d/loader/core/CoreScriptFileCallback.js';
Phaser.Loader.FileTypesManager.register('rexLive2dCoreScript', CoreScriptFileCallback);

import Live2dFileCallback from './gameobjects/live2d/loader/model/Live2dFileCallback.js';
Phaser.Loader.FileTypesManager.register('rexLive2d', Live2dFileCallback);

import Live2dGameObject from './gameobjects/live2d/gameobject/Live2dGameObject.js';

export default Live2dGameObject;