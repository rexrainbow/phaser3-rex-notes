import ConfigurationMethods from './ConfigurationMethods';
import ResetImage from './ResetImage';
import Shatter from './Shatter';

var Methods = {
    resetImage: ResetImage,
    shatter: Shatter
}

Object.assign(
    Methods,
    ConfigurationMethods
)

export default Methods;