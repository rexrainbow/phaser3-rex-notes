import ConfigurationMethods from './ConfigurationMethods.js';
import ResetImage from './ResetImage.js';
import Shatter from './Shatter.js';

var Methods = {
    resetImage: ResetImage,
    shatter: Shatter
}

Object.assign(
    Methods,
    ConfigurationMethods
)

export default Methods;