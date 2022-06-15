import CreateRoundRectangle from './utils/CreateRoundRectangle.js';

var CreateFolderBackground = function (scene, config, styles, gameObject) {
    styles = styles.folderBackground || {};
    return CreateRoundRectangle(scene, config, styles, gameObject);
}

export default CreateFolderBackground;