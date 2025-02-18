import VertexMethods from './VertexMethods.js';
import DirtyFlagsMethods from './DirtyFlagsMethods.js';
import UpdateMethods from './UpdateMethods.js';
import TintMethods from './TintMethods.js';
import DebugMethods from './DebugMethods.js';
import PointMethods from './PointMethods.js';
import SetFaceInteractive from './setfaceinteractive/SetFaceInteractive.js';

var Methods = {
    setFaceInteractive: SetFaceInteractive
};

Object.assign(
    Methods,
    VertexMethods,
    DirtyFlagsMethods,
    UpdateMethods,
    TintMethods,
    DebugMethods,
    PointMethods,
)

export default Methods;