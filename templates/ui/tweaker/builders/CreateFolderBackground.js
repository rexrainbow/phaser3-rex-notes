import CreateRoundRectangle from '../../utils/build/CreateRoundRectangle.js';

var CreateFolderBackground = function (scene, config, style, gameObject) {
    var folderBackgroundStyle = style.folderBackground || {};
    return CreateRoundRectangle(scene, config, folderBackgroundStyle, gameObject);
}

export default CreateFolderBackground;