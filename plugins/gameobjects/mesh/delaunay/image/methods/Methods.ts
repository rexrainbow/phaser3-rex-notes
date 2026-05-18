import ConfigurationMethods from './ConfigurationMethods';
import ResetImage from './ResetImage';
import ReTriangulate from './ReTriangulate';

var Methods = {
    resetImage: ResetImage,
    reTriangulate: ReTriangulate
}

Object.assign(
    Methods,
    ConfigurationMethods
)

export default Methods;