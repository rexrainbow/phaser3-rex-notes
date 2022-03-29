import SetGetFrameNameCallback from './texture/SetGetFrameNameCallback.js';
import SetTexture from './texture/SetTexture.js';
import DrawImage from './texture/DrawImage.js';
import DrawTileSprite from './texture/DrawTileSprite.js';
import UpdateTexture from './texture/UpdateTexture.js';
import SetStretchMode from './texture/SetStretchMode.js';
import GetStretchMode from './texture/GetStretchMode.js';
import SetPreserveRatio from './texture/SetPreserveRatio.js';
import SetMaxFixedPartScale from './texture/SetMaxFixedPartScale.js';

export default {
    setGetFrameNameCallback: SetGetFrameNameCallback,
    setTexture: SetTexture,
    _drawImage: DrawImage,
    _drawTileSprite: DrawTileSprite,
    updateTexture: UpdateTexture,
    setStretchMode: SetStretchMode,
    getStretchMode: GetStretchMode,
    setPreserveRatio: SetPreserveRatio,
    setMaxFixedPartScale: SetMaxFixedPartScale,
};
