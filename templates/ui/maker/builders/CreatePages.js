import CreateAnySizer from './utils/CreateAnySizer.js';
import Pages from '../../pages/Pages.js';

var CreatePages = function (scene, data, styles, customBuilders) {
    return CreateAnySizer(scene, data, styles, customBuilders, Pages);
}

export default CreatePages;