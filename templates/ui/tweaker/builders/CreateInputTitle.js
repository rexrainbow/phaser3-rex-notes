import CreateLabel from './utils/CreateLabel.js';

var CreateInputTitle = function (scene, config, styles, gameObject) {
    styles = styles.inputTitle || {};
    config = {
        text: config.title,

        icon: config.icon,
        iconFrame: config.iconFrame,
    };
    return CreateLabel(scene, config, styles, gameObject);
}

export default CreateInputTitle;