import EndPointsMethods from './EndpointsMethods';
import ShapesUpdateMethods from './ShapesUpdateMethods';
import SetInteractiveMethods from './SetInteractiveMethods';
import { StrokePathConfigMethods } from '../../utils/strokepath/StrokePathMethods';

var Methods = {};

Object.assign(
    Methods,
    EndPointsMethods,
    ShapesUpdateMethods,
    SetInteractiveMethods,
    StrokePathConfigMethods
)

export default Methods;