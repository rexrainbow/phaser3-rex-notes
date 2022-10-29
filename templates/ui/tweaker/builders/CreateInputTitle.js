import CreateTitleLabel from './utils/CreateTitleLabel.js';

var CreateInputTitle = function (scene, config, style, gameObject) {
    var title = CreateTitleLabel(scene, undefined, style, gameObject);

    if (config.title) {
        config.text = config.title;
    }

    title.setTitle(config);
    return title;
}

export default CreateInputTitle;