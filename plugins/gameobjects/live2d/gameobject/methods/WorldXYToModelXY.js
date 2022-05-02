import WorldXYToGameObjectLocalXY from '../../../../utils/position/WorldXYToGameObjectLocalXY.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var WorldXYToModelXY = function (worldX, worldY, camera, out) {
    if ((camera === undefined) || (camera === true) || IsPlainObject(camera)) {
        out = camera;
        camera = this.scene.cameras.main;
    }
    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = globOut;
    }

    out = WorldXYToGameObjectLocalXY(this, worldX, worldY, camera, out);

    var model = this.model;
    out.x = model.localXToModelMatrixX(out.x);
    out.y = model.localYToModelMatrixY(out.y);

    return out;
}

var globOut = {};

export default WorldXYToModelXY;