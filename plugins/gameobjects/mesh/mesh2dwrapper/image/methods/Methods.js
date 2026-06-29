import VertexMethods from './VertexMethods.js';
import IndexMethods from './IndexMethods.js';
import FrameMethods from './FrameMethods.js';
import DebugMethods from './DebugMethods.js';

var Methods = {};

Object.assign(
    Methods,
    VertexMethods,
    IndexMethods,
    FrameMethods,
    DebugMethods,
)

export default Methods;
