import NinePatchBase from '../../../utils/ninepatch/NinePatch.js';
import Methods from './Methods.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;

class NinePatch extends NinePatchBase(RenderTexture, 'rexNinePatch') {

}

Object.assign(
    NinePatch.prototype,
    Methods
);

export default NinePatch;