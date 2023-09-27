import OpenMethods from './OpenMethods.js';
import GetFileName from './GetFileName.js';
import SaveTexture from './SaveTexture.js';

var methods = {
    getFileName: GetFileName,
    saveTexture: SaveTexture,
};

Object.assign(
    methods,
    OpenMethods
)

export default methods;