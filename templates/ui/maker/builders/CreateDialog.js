import MergeStyle from './utils/MergeStyle.js';
import Dialog from '../../dialog/Dialog.js';
import CreateChild from './utils/CreateChild.js';
import CreateChildren from './utils/CreateChildren.js';

var CreateDialog = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    CreateChild(scene, data, 'toolbarBackground', styles, customBuilders);
    CreateChild(scene, data, 'leftToolbarBackground', styles, customBuilders);
    CreateChild(scene, data, 'choicesBackground', styles, customBuilders);
    CreateChild(scene, data, 'actionsBackground', styles, customBuilders);

    CreateChild(scene, data, 'title', styles, customBuilders);
    CreateChildren(scene, data, 'toolbar', styles, customBuilders);
    CreateChildren(scene, data, 'leftToolbar', styles, customBuilders);

    CreateChild(scene, data, 'content', styles, customBuilders);
    CreateChild(scene, data, 'description', styles, customBuilders);

    CreateChildren(scene, data, 'choices', styles, customBuilders);
    CreateChildren(scene, data, 'actions', styles, customBuilders);

    var gameObject = new Dialog(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateDialog;