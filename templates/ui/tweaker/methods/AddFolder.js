import CreateTitleLabel from '../builders/CreateTitleLabel';
import TweakerShell from '../TweakerShell.js'

const GetValue = Phaser.Utils.Objects.GetValue;

var AddFolder = function (config) {
    var scene = this.scene;

    // Create Folder-title
    var titleStyle = GetValue(this.styles, 'folder.title') || {};
    var folderTitle = CreateTitleLabel(scene, config, titleStyle);

    // Add Folder-title to Tweaker
    this.add(
        folderTitle,
        { expand: true }
    );

    // Set content
    folderTitle.setTitle(config);

    // Create child tweaker
    var childTweaker = new TweakerShell(scene, {
        styles: this.styles,
        background: GetValue(this.styles, 'folder.background') || {},
        space: GetValue(this.styles, 'folder.space') || {}
    });
    scene.add.existing(childTweaker);

    // Add child tweaker to Tweaker
    this.add(
        childTweaker,
        { expand: true }
    );

    return childTweaker;
}

export default AddFolder;