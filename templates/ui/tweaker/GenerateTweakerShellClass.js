import Sizer from '../sizer/Sizer.js';
import FixWidthSizer from '../fixwidthsizer/FixWidthSizer.js';
import Methods from './methods/Methods.js';
import CreateBackground from './builders/CreateBackground.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var GenerateTweakerShellClass = function (config) {
    var isWrapMode = GetValue(config, 'wrap', false);
    var BaseClass = (!isWrapMode) ? Sizer : FixWidthSizer;

    class TweakerShell extends BaseClass {
        constructor(scene, config) {
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

            var itemWidth = GetValue(config, 'itemWidth');
            if (itemWidth === undefined) {
                itemWidth = GetValue(this.styles, 'itemWidth', 0);
            }
            this.itemWidth = itemWidth;

            var itemHeight = GetValue(config, 'itemHeight');
            if (itemHeight === undefined) {
                itemHeight = GetValue(this.styles, 'itemHeight', 0);
            }
            this.itemHeight = itemHeight;

            if (
                isWrapMode ||
                ((this.root === this) && (this.orientation === 1))
            ) {

                var alignTitle = GetValue(config, 'inputRow.alignTitle');
                if (alignTitle === undefined) {
                    var titleProportion = GetValue(this.styles, 'inputRow.proportion.title');
                    alignTitle = (!titleProportion);

                } else {
                    if (alignTitle) {  // Override title proportion to 0
                        SetValue(this.styles, 'inputRow.proportion.title', 0);
                    }

                }
                this.alignInputRowTitleStartFlag = alignTitle;

            } else {
                this.alignInputRowTitleStartFlag = false;

            }


            var background = CreateBackground(scene, undefined, config.background);
            if (background) {
                this.addBackground(background);
            }
        }

        preLayout() {
            super.preLayout();

            if (this.alignInputRowTitleStartFlag) {
                this.setInputRowTitleWidth(this.getMaxInputRowTitleWidth());
            }
        }

        createTweaker(config, addToScene) {
            if (addToScene === undefined) {
                addToScene = true;
            }

            var TweakerShellClass = GenerateTweakerShellClass(config);
            var gameObject = new TweakerShellClass(this.scene, config);
            if (addToScene) {
                this.scene.add.existing(gameObject);
            }

            return gameObject;
        }

    }

    Object.assign(
        TweakerShell.prototype,
        Methods
    );

    return TweakerShell;
}



export default GenerateTweakerShellClass;