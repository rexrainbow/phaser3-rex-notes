import Sizer from '../../../sizer/Sizer';
import BindingTargetMethods from './BindingTargetMethods';
import MonitorTargetMethods from './MonitorTargetMethods';
import SetReadOnlyMethods from './SetReadOnlyMethods';
import MinTitleWidthMethods from './MinTitleWidthMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class InputRow extends Sizer {
    add: any;
    addBackground: any;
    addChildrenMap: any;
    autoUpdateEnable: any;
    bindingTarget: any;
    bindTargetKey: any;
    childrenMap: any;
    ignoreDestroy: any;
    orientation: any;
    scene: any;
    setupBinding: any;
    stopMonitorTarget: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexTweaker.InputRow';

        this.bindingTarget = undefined;
        this.bindTargetKey = undefined;
        this.autoUpdateEnable = true;

        var inputTitle = config.inputTitle; // A game object, or undefined/null/false
        var inputField = config.inputField;
        var background = config.background;
        var border = config.border;

        if (inputTitle?: any) {
            var proportion = GetValue(config, 'proportion.title', 0);
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding;
            if (this.orientation === 0) {
                padding = { right: titleSpace };
            } else {
                padding = { bottom: titleSpace };
            }
            this.add(
                inputTitle,
                { proportion: proportion, expand: true, padding: padding }
            );
        }

        var defaultProportion = inputField.defaultProportion;
        if (defaultProportion === undefined) {
            defaultProportion = (config.defaultExpandWidth) ? 1 : 0;
        }
        var proportion = GetValue(config, 'proportion.inputField', defaultProportion);
        this.add(
            inputField,
            { proportion: proportion, expand: true, }
        );

        if (background?: any) {
            this.addBackground(background);
        }

        if (border?: any) {
            this.addBackground(border);
        }

        this.addChildrenMap('title', inputTitle);
        this.addChildrenMap('inputField', inputField);
        this.addChildrenMap('background', background);
        this.addChildrenMap('border', border);

        this.setupBinding();

    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.stopMonitorTarget();

        super.destroy(fromScene);
    }

    setTitle(config?: any) {
        var title = this.childrenMap.title;
        if (!title) {
            return this;
        }

        title.setTitle(config);
        return this;
    }

    preLayout() {
        var title = this.childrenMap.title;
        if (title?: any) {
            title.minWidth = 0;
        }

        super.preLayout();
    }
}

Object.assign(
    InputRow.prototype,
    BindingTargetMethods,
    MonitorTargetMethods,
    SetReadOnlyMethods,
    MinTitleWidthMethods,
)

export default InputRow;