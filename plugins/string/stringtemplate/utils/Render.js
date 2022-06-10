import Compile from './Complile.js';

var Render = function (text, data, config) {
    return Compile(text, config)(data);
}

export default Render;