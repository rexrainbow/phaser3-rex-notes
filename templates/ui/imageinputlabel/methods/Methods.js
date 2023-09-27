import OpenMethods from './OpenMethods.js';
import SaveTexture from './SaveTexture.js';

var methods = {
    saveTexture: SaveTexture,
};

Object.assign(
    methods,
    OpenMethods
)

export default methods;