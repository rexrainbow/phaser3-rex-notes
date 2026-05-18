import SetGetFrameNameCallback from './texture/SetGetFrameNameCallback';
import SetBaseTexture from './texture/SetBaseTexture';
import UpdateTexture from './texture/UpdateTexture';
import SetStretchMode from './texture/SetStretchMode';
import GetStretchMode from './texture/GetStretchMode';
import SetPreserveRatio from './texture/SetPreserveRatio';
import SetMaxFixedPartScale from './texture/SetMaxFixedPartScale';
import NOOP from '../object/NOOP';

export default {
    _beginDraw: NOOP,
    _drawImage: NOOP,
    _drawTileSprite: NOOP,
    _endDraw: NOOP,

    setGetFrameNameCallback: SetGetFrameNameCallback,
    setBaseTexture: SetBaseTexture,
    updateTexture: UpdateTexture,
    setStretchMode: SetStretchMode,
    getStretchMode: GetStretchMode,
    setPreserveRatio: SetPreserveRatio,
    setMaxFixedPartScale: SetMaxFixedPartScale,
};