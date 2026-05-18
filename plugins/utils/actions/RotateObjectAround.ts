import { Math as PhaserMath } from 'phaser';
const RotateAround = PhaserMath.RotateAround;

var RotateObjectAround = function(gameObject?: any, x?: any, y?: any, angle?: any) {
    RotateAround(gameObject, x, y, angle);
    gameObject.rotation += angle;
    return gameObject;
}

export default RotateObjectAround;