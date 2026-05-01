import { Math as PhaserMath } from 'phaser';
const RotateAround = PhaserMath.RotateAround;

var RotateObjectAround = function (gameObject, x, y, angle) {
    RotateAround(gameObject, x, y, angle);
    gameObject.rotation += angle;
    return gameObject;
}

export default RotateObjectAround;