import MergeStyle from './utils/MergeStyle.js';
import HolyGrail from '../../holygrail/HolyGrail.js';
import CreateChild from './utils/CreateChild.js';

var CreateDialog = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    CreateChild(scene, data, 'content', styles, customBuilders);
    CreateChild(scene, data, 'leftSide', styles, customBuilders);
    CreateChild(scene, data, 'rightSide', styles, customBuilders);
    CreateChild(scene, data, 'header', styles, customBuilders);
    CreateChild(scene, data, 'footer', styles, customBuilders);

    var gameObject = new HolyGrail(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateDialog;