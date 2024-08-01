import CreateFolder from '../builders/CreateFolder.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddFolder = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Create folder
    var folderStyle = GetValue(this.styles, 'folder') || {};
    folderStyle.tweaker = this.styles;
    folderStyle.root = this.root;
    var folder = CreateFolder(this, config, folderStyle);
    delete folderStyle.tweaker;
    delete folderStyle.root;


    // Add folder
    this.add(
        folder,
        { expand: true }
    );

    // Set content
    folder.setTitle(config);

    var expanded = GetValue(config, 'expanded', true);
    if (expanded !== undefined) {
        folder.setExpandedState(expanded);
    }

    var childTweaker = folder.childrenMap.child;

    if (config.key) {
        this.root.addChildrenMap(config.key, childTweaker);
    }

    return childTweaker;
}

export default AddFolder;