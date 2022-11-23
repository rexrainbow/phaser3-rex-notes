import CreateTitleLabel from './CreateTitleLabel.js';
import TweakerShell from '../TweakerShell.js';
import CreateBackground from './CreateBackground.js';
import Folder from '../gameobjects/folder/Folder.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateFolder = function (scene, config, style) {
    // Create Folder-title
    var titleStyle = GetValue(style, 'title') || {};
    var title = CreateTitleLabel(scene, config, titleStyle);

    var child = new TweakerShell(scene, {
        styles: GetValue(style, 'child'),
        space: GetValue(style, 'space') || {}
    });
    scene.add.existing(child);

    var backgroundStyle = GetValue(style, 'background');
    var background = CreateBackground(scene, config, backgroundStyle);

    var folder = new Folder(scene, {
        title: title,
        child: child,
        background: background,
        transition: {
            duration: GetValue(style, 'transition.duration', 200)
        }
    })
    scene.add.existing(folder);

    return folder;
}

export default CreateFolder;