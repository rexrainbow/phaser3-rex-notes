import ScaleImage from './ScaleImage.js';
import FlipMethods from '../../utils/FlipMethods.js';

var methods = {
    scaleImage: ScaleImage
}

Object.assign(
    methods,
    FlipMethods
)

export default methods;