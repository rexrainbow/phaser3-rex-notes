import CreateTitleLabel from './utils/CreateTitleLabel.js';

var CreateInputTitle = function (scene, config, styles, gameObject) {
    var titleLabelStyle = styles.inputTitle || {};
    var title = CreateTitleLabel(scene, undefined, titleLabelStyle, gameObject);

    if (config.title) {
        config.text = config.title;
    }

    title.setTitle(config);
    return title;
}

export default CreateInputTitle;