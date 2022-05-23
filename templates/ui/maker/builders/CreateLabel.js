import MergeStyle from './utils/MergeStyle.js';
import Label from '../../label/Label.js';
import CreateChild from './utils/CreateChild.js';

var CreateLabel = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    CreateChild(scene, data, 'icon', styles, customBuilders);
    CreateChild(scene, data, 'text', styles, customBuilders);
    CreateChild(scene, data, 'action', styles, customBuilders);

    var gameObject = new Label(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateLabel;