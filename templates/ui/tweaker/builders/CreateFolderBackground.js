import CreateRoundRectangle from '../../utils/build/CreateRoundRectangle.js';

var CreateFolderBackground = function (scene, config, style) {
    var folderBackgroundStyle = style.folderBackground || {};
    return CreateRoundRectangle(scene, config, folderBackgroundStyle);
}

export default CreateFolderBackground;