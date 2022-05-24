import CreateAnySizer from './utils/CreateAnySizer.js';
import FixWidthSizer from '../../fixwidthsizer/FixWidthSizer.js';

var CreateFixWidthSizer = function (scene, data, styles, customBuilders) {
    return CreateAnySizer(scene, data, styles, customBuilders, FixWidthSizer);
}

export default CreateFixWidthSizer;