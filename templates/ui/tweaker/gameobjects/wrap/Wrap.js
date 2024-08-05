import Sizer from '../../../sizer/Sizer.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Wrap extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 'y';

        super(scene, config);
        this.type = 'rexTweaker.Wrap';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var title = GetValue(config, 'title', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (title) {
            this.add(
                title,
                {
                    expand: true,
                    space: {
                        bottom: GetValue(config, 'space.title', 0)
                    }
                }
            );
        }

        var child = GetValue(config, 'child', undefined);
        this.add(
            child,
            { expand: true }
        );

        this.addChildrenMap('title', title);
        this.addChildrenMap('child', child);
    }

    setTitle(config) {
        var title = this.childrenMap.title;

        if (config.title || config.icon) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }
}

Object.assign(
    Wrap.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
)

export default Wrap;