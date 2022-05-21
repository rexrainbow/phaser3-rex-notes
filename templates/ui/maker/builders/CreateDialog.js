import MergeStyle from './MergeStyle.js';
import Dialog from '../../dialog/Dialog.js';
import CreateChild from './CreateChild.js';

var CreateDialog = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'toolbarBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'leftToolbarBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'choicesBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'actionsBackground', view, styles, customBuilders);

    CreateChild(scene, data, 'title', view, styles, customBuilders);

    var toolbarConfig = data.toolbar;
    if (toolbarConfig) {
        for (var i = 0, cnt = toolbarConfig.length; i < cnt; i++) {
            CreateChild(scene, toolbarConfig, i, view, styles, customBuilders);
        }
    }

    var leftToolbarConfig = data.leftToolbar;
    if (leftToolbarConfig) {
        for (var i = 0, cnt = leftToolbarConfig.length; i < cnt; i++) {
            CreateChild(scene, leftToolbarConfig, i, view, styles, customBuilders);
        }
    }

    CreateChild(scene, data, 'content', view, styles, customBuilders);
    CreateChild(scene, data, 'description', view, styles, customBuilders);

    var choicesConfig = data.choices;
    if (choicesConfig) {
        for (var i = 0, cnt = choicesConfig.length; i < cnt; i++) {
            CreateChild(scene, choicesConfig, i, view, styles, customBuilders);
        }
    }

    var actionsConfig = data.actions;
    if (actionsConfig) {
        for (var i = 0, cnt = actionsConfig.length; i < cnt; i++) {
            CreateChild(scene, actionsConfig, i, view, styles, customBuilders);
        }
    }

    var gameObject = new Dialog(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateDialog;