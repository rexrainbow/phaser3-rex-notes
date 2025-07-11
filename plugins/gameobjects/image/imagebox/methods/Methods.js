import ScaleImage from './ScaleImage.js';
import FlipMethods from '../../../container/utils/FlipMethods.js';

var methods = {
    scaleImage: ScaleImage
}

Object.assign(
    methods,
    FlipMethods
)

export default methods;