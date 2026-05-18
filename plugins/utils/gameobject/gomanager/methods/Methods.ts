import GetMethods from './GetMethods';
import AddMethods from './AddMethods';
import RemoveMethods from './RemoveMethods';
import PropertyMethods from './PropertyMethods';
import CallMethods from './CallMethods';
import DataMethods from './DataMethods';
import FadeMethods from './FadeMethods';
import DrawGameObjectsBounds from './DrawGameObjectsBounds';
import CameraMethods from './CameraMethods';

var Methods = {
    drawGameObjectsBounds: DrawGameObjectsBounds,
};

Object.assign(
    Methods,
    GetMethods,
    AddMethods,
    RemoveMethods,
    PropertyMethods,
    CallMethods,
    DataMethods,
    FadeMethods,
    CameraMethods,
)

export default Methods;