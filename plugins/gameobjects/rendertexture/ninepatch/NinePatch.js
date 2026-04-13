import NinePatchBase from '../../../utils/ninepatch/NinePatch.js';
import DrawImage from '../utils/DrawImage.js';
import DrawTileSprite from '../utils/DrawTileSprite.js';
import EndDraw from '../utils/EndDraw.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;

class NinePatch extends NinePatchBase(RenderTexture, 'rexNinePatch') {
}

var Methods = {
    _drawImage: DrawImage,
    _drawTileSprite: DrawTileSprite,
    _endDraw: EndDraw,
}
Object.assign(
    NinePatch.prototype,
    Methods
);

export default NinePatch;