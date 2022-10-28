import CreateTitleLabel from './utils/CreateTitleLabel.js';

var CreateFolderTitle = function (scene, config, styles, gameObject) {
    styles = styles.folderTitle || {};
    return CreateTitleLabel(scene, config, styles, gameObject);
}

export default CreateFolderTitle;