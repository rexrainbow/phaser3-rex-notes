import IsCameraObject from './IsCameraObject.js';
import { Geom as PhaserGeom } from 'phaser';
const Rectangle = PhaserGeom.Rectangle;

var GetViewport = function (scene, camera, out) {
    if (!IsCameraObject(camera)) {
        out = camera;
        camera = undefined;
    }

    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        out = globRect;
    }

    if (camera) {
        return scene.scale.getViewPort(camera, out);
    } else {
        return scene.scale.getViewPort(out);
    }
}

var globRect = new Rectangle();

export default GetViewport;