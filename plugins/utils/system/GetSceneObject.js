'use strict'

import Phaser from 'phaser';
const SceneKlass = Phaser.Scene;

var GetSceneObject = function (parent) {
    if (parent instanceof SceneKlass) { // parent = scene
        return parent;
    } else if (parent.scene && (parent.scene instanceof SceneKlass)) { // parent = game object
        return parent.scene;
    } else if (parent.parent && parent.parent.scene && (parent.parent.scene instanceof SceneKlass)) { // parent = bob object
        return parent.parent.scene;
    }
}

export default GetSceneObject;