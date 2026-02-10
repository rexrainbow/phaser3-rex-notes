import FolderTitle from '../gameobjects/label/FolderTitle.js';
import CreateBackground from './CreateBackground.js';
import Folder from '../gameobjects/folder/Folder.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateFolder = function (parent, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = parent.scene;

    // Create Folder-title
    var title = new FolderTitle(scene, (style.title || {}));
    scene.add.existing(title);

    title
        .on('folder.expand', function () {
            title.setExpandedState(true);
        })
        .on('folder.collapse', function () {
            title.setExpandedState(false);
        })

    // tweaker panel
    var tweakerConfig = {
        root: style.root,
        styles: style.tweaker,
    }
    var child = parent.createTweaker(tweakerConfig);

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    var folder = new Folder(scene, {
        title: title,
        child: child,
        background: background,
        space: style.space,

        transition: {
            duration: GetValue(style, 'transition.duration', 200)
        },
    })
    scene.add.existing(folder);

    return folder;
}

export default CreateFolder;