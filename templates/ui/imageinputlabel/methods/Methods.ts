import OpenMethods from './OpenMethods';
import GetFileName from './GetFileName';
import SaveTexture from './SaveTexture';

var methods = {
    getFileName: GetFileName,
    saveTexture: SaveTexture,
};

Object.assign(
    methods,
    OpenMethods
)

export default methods;