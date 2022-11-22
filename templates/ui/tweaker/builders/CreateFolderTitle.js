import CreateTitleLabel from './CreateTitleLabel.js';

var CreateFolderTitle = function (scene, config, style) {
    style = style.folderTitle || {};
    return CreateTitleLabel(scene, config, style);
}

export default CreateFolderTitle;