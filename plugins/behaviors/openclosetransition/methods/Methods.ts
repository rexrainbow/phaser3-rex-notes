import DelayCallMethods from './DelayCallMethods';
import ConfigurationMethods from './ConfigurationMethods';
import OpenMethods from './OpenMethods';
import CloseMethods from './CloseMethods';

var methods = {};

Object.assign(
    methods,
    DelayCallMethods,
    ConfigurationMethods,
    OpenMethods,
    CloseMethods,
)

export default methods;