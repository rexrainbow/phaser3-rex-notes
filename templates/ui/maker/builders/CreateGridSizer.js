import CreateAnySizer from './utils/CreateAnySizer.js';
import GridSizer from '../../gridsizer/GridSizer.js';

var CreateGridSizer = function (scene, data, styles, customBuilders) {
    return CreateAnySizer(scene, data, styles, customBuilders, GridSizer);
}

export default CreateGridSizer;