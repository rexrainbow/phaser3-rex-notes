import ConfigurationMethods from './ConfigurationMethods.js';
import ResetImage from './ResetImage.js';
import ReTriangulate from './ReTriangulate.js';

var Methods = {
    resetImage: ResetImage,
    reTriangulate: ReTriangulate
}

Object.assign(
    Methods,
    ConfigurationMethods
)

export default Methods;