import NinePatchBase from '../../../utils/ninepatch/NinePatch';
import DrawImage from '../utils/DrawImage';
import DrawTileSprite from '../utils/DrawTileSprite';
import EndDraw from '../utils/EndDraw';

import { GameObjects as PhaserGameObjects } from 'phaser';
const RenderTexture = PhaserGameObjects.RenderTexture;

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