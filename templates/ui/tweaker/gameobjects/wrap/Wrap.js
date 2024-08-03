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
        var header = GetValue(config, 'header', undefined);
        var footer = GetValue(config, 'footer', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (header) {
            this.add(
                header,
                { expand: true }
            );
        }

        var child = GetValue(config, 'child', undefined);
        this.add(
            child,
            { expand: true }
        );

        if (footer) {
            this.add(
                footer,
                { expand: true }
            );
        }

        this.addChildrenMap('header', header);
        this.addChildrenMap('child', child);
        this.addChildrenMap('footer', footer);
    }

    setTitle(config) {
        var title = this.childrenMap.header;

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