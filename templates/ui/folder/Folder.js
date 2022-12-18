import Sizer from '../sizer/Sizer';
import ExpandMethods from './methods/ExpandMethods.js';
import ClickMethods from '../basesizer/ClickMethods';

const GetValue = Phaser.Utils.Objects.GetValue;

class Folder extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexFolder';

        this.expanded = true;
        this.expandDirection = (this.orientation === 1) ? 'y' : 'x';

        var background = config.background;
        var title = config.title;
        var child = config.child;

        if (background) {
            this.addBackground(background);
        }

        this.add(
            title,
            {
                proportion: 0,
                expand: GetValue(config, 'expand.title', true),
            }
        );

        if (this.orientation === 1) { // y
            child.setOrigin(0.5, 0);
        } else {
            child.setOrigin(0, 0.5);
        }
        this.add(
            child,
            {
                proportion: 0,
                expand: GetValue(config, 'expand.child', true),
            }
        );

        this.addChildrenMap('title', title);
        this.addChildrenMap('child', child);
        this.addChildrenMap('background', background);

        this.setTransitionDuration(GetValue(config, 'transition.duration', 200));

        if (GetValue(config, 'toggleByClickingTitle', true)) {
            ClickMethods.onClick.call(title, this.toggle, this)
        }

        if (!GetValue(config, 'expanded', true)) {
            this.collapse(0);
        }
    }

    setTransitionDuration(duration) {
        this.transitionDuration = duration;
        return this;
    }

}

Object.assign(
    Folder.prototype,
    ExpandMethods,
)

export default Folder;