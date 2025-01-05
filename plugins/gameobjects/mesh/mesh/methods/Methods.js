import VertexMethods from './VertexMethods.js';
import UpdateMethods from './UpdateMethods.js';
import TintMethods from './TintMethods.js';
import DebugMethods from './DebugMethods.js';

var Methods = {};

Object.assign(
    Methods,
    VertexMethods,
    UpdateMethods,
    TintMethods,
    DebugMethods
)

export default Methods;