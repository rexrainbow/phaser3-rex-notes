import MergeStyle from './utils/MergeStyle.js';
import Buttons from '../../buttons/Buttons.js';
import CreateChild from './utils/CreateChild.js';
import CreateChildren from './utils/CreateChildren.js';

var CreateButtons = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    CreateChildren(scene, data, 'buttons', styles, customBuilders);

    var gameObject = new Buttons(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateButtons;