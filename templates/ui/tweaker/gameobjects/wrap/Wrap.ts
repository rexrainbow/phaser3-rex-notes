import Sizer from '../../../sizer/Sizer';
import BindingTargetMethods from './BindingTargetMethods';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods';
import SetReadOnlyMethods from './SetReadOnlyMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Wrap extends Sizer {
    add: any;
    addBackground: any;
    addChildrenMap: any;
    childrenMap: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 'y';

        super(scene, config);
        this.type = 'rexTweaker.Wrap';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var title = GetValue(config, 'title', undefined);

        if (background?: any) {
            this.addBackground(background);
        }

        if (title?: any) {
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

    setTitle(config?: any) {
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
    SetReadOnlyMethods,
)

export default Wrap;