import ConfigurationMethods from './ConfigurationMethods'
import OpenColorPicker from './OpenColorPicker';

var methods = {
    openColorPicker: OpenColorPicker
}

Object.assign(
    methods,
    ConfigurationMethods,
);

export default methods;