import FaceMethods from './FaceMethods.js';
import UpdateMethods from './UpdateMethods.js';
import DebugMethods from './DebugMethods.js';

var Methods = {};

Object.assign(
    Methods,
    FaceMethods,
    UpdateMethods,
    DebugMethods
)

export default Methods;