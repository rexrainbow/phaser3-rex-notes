import Sizer from '../sizer/Sizer';
import FixWidthSizer from '../fixwidthsizer/FixWidthSizer';
import Methods from './methods/Methods';
import CreateBackground from './builders/utils/CreateBackground';
import SetValue from '../../../plugins/utils/object/SetValue';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var GenerateTweakerShellClass = function(config?: any) {
    var isWrapMode = GetValue(config, 'wrap', false);
    var BaseClass = (!isWrapMode) ? Sizer : FixWidthSizer;

    class TweakerShell extends BaseClass {
    alignTitle: any;

    _readOnly: any;
    addBackground: any;
    alignInputRowTitleStartFlag: any;
    expandInputRowHeight: any;
    getMaxInputRowTitleWidth: any;
    inputHandlers: any;
    isWrapMode: any;
    itemHeight: any;
    itemWidth: any;
    orientation: any;
    root: any;
    scene: any;
    setInputRowTitleWidth: any;
    sizerChildren: any;
    styles: any;
    type: any;

        constructor(scene?: any, config?: any) {
            if (config === undefined) {
                config = {};
            }

            if (config.orientation === undefined) {
                config.orientation = (!isWrapMode) ? 1 : 0;
            }

            // Create sizer
            super(scene, config);
            this.type = 'rexTweakerShell';

            this.isWrapMode = isWrapMode;

            if (!config.root) {
                this.root = this;
                this.inputHandlers = [];
            } else {
                this.root = config.root;
                this.inputHandlers = this.root.inputHandlers;
            }

            this.styles = GetValue(config, 'styles') || {};
            this.styles.orientation = this.orientation;

            this.itemWidth = GetValue(config, 'itemWidth', 0, this.styles);
            this.itemHeight = GetValue(config, 'itemHeight', 0, this.styles);

            // Set inputRow.alignTitle
            if (this.isRoot) {
                var alignTitle = GetValue(config, 'inputRow.alignTitle');
                if (alignTitle === undefined) {
                    // alignTitle if inputRow.proportion.title is not 0 (eg. 1)
                    var titleProportion = GetValue(this.styles, 'inputRow.proportion.title');
                    alignTitle = (!titleProportion);
                    SetValue(config, 'inputRow.alignTitle', alignTitle);

                } else {
                    // not alignTitle, set title proportion to 0
                    if (!alignTitle) {  // Override title proportion to 0
                        SetValue(this.styles, 'inputRow.proportion.title', 0);
                    }

                }

                this.alignTitle = alignTitle;
            }

            if ((this.isRoot && (this.orientation === 1)) || isWrapMode) {
                this.setAlignInputRowTitleEnable(this.root.alignTitle);
            } else {
                this.setAlignInputRowTitleEnable(false);
            }

            this.setExpandInputRowHeightEnable(GetValue(config, 'expandInputRowHeight', false));

            var background = CreateBackground(scene, undefined, config.background);
            if (background?: any) {
                this.addBackground(background);
            }
        }

        get isRoot() {
            return this.root === this;
        }

        setAlignInputRowTitleEnable(enable?: any) {
            if (enable === undefined) {
                enable = true;
            }
            this.alignInputRowTitleStartFlag = enable;
            return this;
        }

        setExpandInputRowHeightEnable(enable?: any) {
            if (enable === undefined) {
                enable = true;
            }
            this.expandInputRowHeight = enable;
            return this;
        }

        preLayout() {
            super.preLayout();

            if (this.alignInputRowTitleStartFlag) {
                this.setInputRowTitleWidth(this.getMaxInputRowTitleWidth());
            }
        }

        createTweaker(config?: any, addToScene?: any) {
            if (addToScene === undefined) {
                addToScene = true;
            }

            var TweakerShellClass = GenerateTweakerShellClass(config);
            var gameObject = new TweakerShellClass(this.scene, config);
            if (addToScene?: any) {
                this.scene.add.existing(gameObject);
            }

            return gameObject;
        }

        get readOnly() {
            return this._readOnly;
        }

        set readOnly(value) {
            value = !!value;
            var children = this.sizerChildren;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (!child.setReadOnly) {
                    continue;
                }

                child.setReadOnly(value);
            }

        }

        setReadOnly(value?: any) {
            if (value === undefined) {
                value = true;
            }
            this.readOnly = value;
            return this;
        }
    }

    Object.assign(
        TweakerShell.prototype,
        Methods
    );

    return TweakerShell;
}



export default GenerateTweakerShellClass;