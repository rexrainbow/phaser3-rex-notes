import Sizer from '../sizer/Sizer';
import ChildTransition from './methods/ChildTransition.js';
import ExpandMethods from './methods/ExpandMethods.js';
import ClickMethods from '../basesizer/ClickMethods';
import ConfigurationMethods from './methods/ConfigurationMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Folder extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('orientation')) {
            config.orientation = 1;
        }

        super(scene, config);
        this.type = 'rexFolder';

        this.expanded = true;
        this.expandDirection = (this.orientation === 1) ? 'y' : 'x';

        var background = config.background;
        var title = config.title;
        var child = config.child;

        // background
        if (background) {
            this.addBackground(background);
        }

        // title
        var align = GetValue(config, 'align.title', 'left');
        var expand = GetValue(config, 'expand.title', true);
        this.add(
            title,
            {
                proportion: 0, align: align, expand: expand,
            }
        );

        // child
        this.childTransition = new ChildTransition(child);

        var customOrigin = GetValue(config, 'customOrigin', false);
        if (!customOrigin) {
            child.setOrigin(0, 0);
        }

        var align = GetValue(config, 'align.child', 'left');
        var expand = GetValue(config, 'expand.child', true);
        var proportion = (expand) ? 1 : 0;
        this.add(
            child,
            {
                proportion: proportion, align: align, expand: expand,

            }
        );

        this.addChildrenMap('title', title);
        this.addChildrenMap('child', child);
        this.addChildrenMap('background', background);

        this.setTransitionDuration(GetValue(config, 'transition.duration', 200));
        this.setExpandCallback(GetValue(config, 'expandCallback', undefined));
        this.setCollapseCallback(GetValue(config, 'collapseCallback', undefined));

        if (GetValue(config, 'toggleByClickingTitle', true)) {
            ClickMethods.onClick.call(
                title,
                function () {
                    this.toggle();
                },
                this)
        }

        if (!GetValue(config, 'expanded', true)) {
            this.collapse(0);
        }
    }

}

Object.assign(
    Folder.prototype,
    ExpandMethods,
    ConfigurationMethods,
)

export default Folder;