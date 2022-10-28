import CreateRoundRectangle from './utils/CreateRoundRectangle.js';

var CreateFolderBackground = function (scene, config, styles, gameObject) {
    var folderBackgroundStyle = styles.folderBackground || {};
    return CreateRoundRectangle(scene, config, folderBackgroundStyle, gameObject);
}

export default CreateFolderBackground;