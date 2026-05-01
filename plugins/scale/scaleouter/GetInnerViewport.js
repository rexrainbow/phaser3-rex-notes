import { Geom as PhaserGeom } from 'phaser';
const Rectangle = PhaserGeom.Rectangle;
var GetInnerViewport = function (scaleOuter, out) {
    if (out === undefined) {
        out = new Rectangle();
    }

    var gameConfig = scaleOuter.scene.game.config;
    var width = gameConfig.width,
        height = gameConfig.height;
    out.setTo(0, 0, width, height);
    return out;
}

export default GetInnerViewport;