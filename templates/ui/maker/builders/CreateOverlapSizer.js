import CreateAnySizer from './utils/CreateAnySizer.js';
import OverlapSizer from '../../overlapsizer/OverlapSizer.js';

var CreateOverlapSizer = function (scene, data, styles, customBuilders) {
    return CreateAnySizer(scene, data, styles, customBuilders, OverlapSizer);
}

export default CreateOverlapSizer;