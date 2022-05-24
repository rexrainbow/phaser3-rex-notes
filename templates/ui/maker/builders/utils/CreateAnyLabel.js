import MergeStyle from './MergeStyle.js';
import CreateChild from './CreateChild.js';

var CreateAnyLabel = function (scene, data, styles, customBuilders, LabelClass) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    CreateChild(scene, data, 'icon', styles, customBuilders);
    CreateChild(scene, data, 'text', styles, customBuilders);
    CreateChild(scene, data, 'action', styles, customBuilders);

    var gameObject = new LabelClass(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateAnyLabel;