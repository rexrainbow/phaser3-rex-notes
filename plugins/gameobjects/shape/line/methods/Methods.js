import EndPointsMethods from './EndpointsMethods.js';
import ShapesUpdateMethods from './ShapesUpdateMethods.js';
import SetInteractiveMethods from './SetInteractiveMethods.js';
import { StrokePathConfigMethods } from '../../utils/strokepath/StrokePathMethods.js';

var Methods = {};

Object.assign(
    Methods,
    EndPointsMethods,
    ShapesUpdateMethods,
    SetInteractiveMethods,
    StrokePathConfigMethods
)

export default Methods;