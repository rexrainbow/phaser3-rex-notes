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

        this.reLayoutEnable = true;
        this.expanded = undefined;
        this.expandDirection = (this.orientation === 1) ? 'y' : 'x';

        var background = config.background;
        var title = config.title;
        var child = config.child;

        // background
        if (background) {
            this.addBackground(background);
        }

        var spaceConfig = GetValue(config, 'space');

        // title
        var defaultAlign = (this.orientation === 1) ? 'left' : 'top';
        var align = GetValue(config, 'align.title', defaultAlign);
        var expand = GetValue(config, 'expand.title', true);
        this.add(
            title,
            {
                proportion: 0,
                align: align,
                expand: expand,
                padding: {
                    left: GetValue(spaceConfig, 'titleLeft', 0),
                    right: GetValue(spaceConfig, 'titleRight', 0),
                    top: GetValue(spaceConfig, 'titleTop', 0),
                    bottom: GetValue(spaceConfig, 'titleBottom', 0)
                }
            }
        );

        var toggleByTarget = GetValue(config, 'toggleByTarget', undefined);
        var toggleClickConfig = GetValue(config, 'toggleClickConfig');

        if (toggleByTarget === undefined) {
            toggleByTarget = title;
        }
        if (toggleByTarget) {
            ClickMethods.onClick.call(
                toggleByTarget,
                function () {
                    this.toggle();
                },
                this,
                toggleClickConfig
            );
        }

        // child
        this.childTransition = new ChildTransition(child);

        var customOrigin = GetValue(config, 'customChildOrigin', false);
        if (!customOrigin) {
            var origin = (!this.rtl) ? 0 : 1;
            child.setOrigin(origin);
        }

        var align = GetValue(config, 'align.child', 'left');
        var expand = GetValue(config, 'expand.child', true);
        var proportion = (expand) ? 1 : 0;
        this.add(
            child,
            {
                proportion: proportion,
                align: align,
                expand: expand,
                padding: {
                    left: GetValue(spaceConfig, 'childLeft', 0),
                    right: GetValue(spaceConfig, 'childRight', 0),
                    top: GetValue(spaceConfig, 'childTop', 0),
                    bottom: GetValue(spaceConfig, 'childBottom', 0)
                }
            }
        );

        this.addChildrenMap('title', title);
        this.addChildrenMap('child', child);
        this.addChildrenMap('background', background);

        var transitionConfig = config.transition;
        this.setTransitionDuration(GetValue(transitionConfig, 'duration', 200));
        this.setExpandCallback(GetValue(transitionConfig, 'expandCallback', undefined));
        this.setCollapseCallback(GetValue(transitionConfig, 'collapseCallback', undefined));

        this.reLayoutTarget = GetValue(config, 'reLayoutTarget', undefined);

        var onExpandStart = config.onExpandStart;
        if (onExpandStart) {
            this.on('expand.start', onExpandStart);
        }

        var onExpandComplete = config.onExpandComplete;
        if (onExpandComplete) {
            this.on('expand.complete', onExpandComplete);
        }

        var onCollapseStart = config.onCollapseStart;
        if (onCollapseStart) {
            this.on('collapse.start', onCollapseStart);
        }

        var onCollapseComplete = config.onCollapseComplete;
        if (onCollapseComplete) {
            this.on('collapse.complete', onCollapseComplete);
        }

        var expanded = GetValue(config, 'expanded', undefined);
        if (expanded !== undefined) {
            this.setExpandedState(expanded);
        }
    }
}

Object.assign(
    Folder.prototype,
    ExpandMethods,
    ConfigurationMethods,
)

export default Folder;