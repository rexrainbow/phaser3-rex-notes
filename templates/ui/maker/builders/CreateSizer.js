import CreateAnySizer from './utils/CreateAnySizer.js';
import Sizer from '../../sizer/Sizer.js';

var CreateSizer = function (scene, data, styles, customBuilders) {
    return CreateAnySizer(scene, data, styles, customBuilders, Sizer);
}

export default CreateSizer;