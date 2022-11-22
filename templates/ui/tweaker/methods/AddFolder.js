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
    childTweaker.setOrigin(0.5, 0);

    // Add child tweaker to Tweaker
    this.add(
        childTweaker,
        { expand: true }
    );

    // On-click callback, to expand or collapse child tweaker
    var duration = GetValue(this.styles, 'folder.transition.duration', 200);
    childTweaker.isExpanded = true;
    folderTitle.onClick(function () {
        if (childTweaker.isExpanded) {
            childTweaker
                .once('scaledown.complete', function () {
                    this
                        .setChildScale(childTweaker, 1, 1)
                        .hide(childTweaker)
                        .getTopmostSizer().layout()
                }, this)
                .scaleDown(duration, 'y')

        } else {
            this
                .show(childTweaker)
                .getTopmostSizer().layout()

            childTweaker
                .popUp(duration, 'y')
        }

        childTweaker.isExpanded = !childTweaker.isExpanded;
    }, this)

    return childTweaker;
}

export default AddFolder;