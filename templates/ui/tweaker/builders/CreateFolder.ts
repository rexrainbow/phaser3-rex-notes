import FolderTitle from '../gameobjects/label/FolderTitle';
import CreateBackground from './utils/CreateBackground';
import Folder from '../gameobjects/folder/Folder';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateFolder = function(tweaker?: any, config?: any, style?: any) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = tweaker.scene;

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // Create Folder-title
    var title = new FolderTitle(scene, (style.title || {}));
    scene.add.existing(title);

    title
        .on('folder.expand', function() {
            title.setExpandedState(true);
        })
        .on('folder.collapse', function() {
            title.setExpandedState(false);
        })

    // tweaker panel
    var tweakerConfig = {
        root: tweaker.root,
        styles: tweaker.styles,
    }
    var child = tweaker.createTweaker(tweakerConfig);

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