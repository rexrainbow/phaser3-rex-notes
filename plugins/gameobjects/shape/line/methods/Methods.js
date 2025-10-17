import EndPointsMethods from './EndpointsMethods.js';
import ShapesUpdateMethods from './ShapesUpdateMethods.js';
import SetInteractiveMethods from './SetInteractiveMethods.js';

var Methods = {};

Object.assign(
    Methods,
    EndPointsMethods,
    ShapesUpdateMethods,
    SetInteractiveMethods
)

export default Methods;