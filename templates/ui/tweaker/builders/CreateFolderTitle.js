import CreateLabel from './utils/CreateLabel.js';

var CreateFolderTitle = function (scene, config, styles, gameObject) {
    styles = styles.folderTitle || {};
    return CreateLabel(scene, config, styles, gameObject);
}

export default CreateFolderTitle;