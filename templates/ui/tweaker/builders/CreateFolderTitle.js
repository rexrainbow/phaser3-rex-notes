import CreateTitleLabel from './utils/CreateTitleLabel.js';

var CreateFolderTitle = function (scene, config, style, gameObject) {
    style = style.folderTitle || {};
    return CreateTitleLabel(scene, config, style, gameObject);
}

export default CreateFolderTitle;