import CreateRoundRectangle from './utils/CreateRoundRectangle.js';

var CreateFolderBackground = function (scene, config, styles, gameObject) {
    return CreateRoundRectangle(scene, config, styles.folderBackground, gameObject);
}

export default CreateFolderBackground;