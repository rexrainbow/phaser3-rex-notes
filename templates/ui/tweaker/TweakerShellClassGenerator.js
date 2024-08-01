import Sizer from '../sizer/Sizer.js';
import FixWidthSizer from '../fixwidthsizer/FixWidthSizer.js';
import Methods from './methods/Methods.js';
import CreateBackground from './builders/CreateBackground.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TweakerShellClassGenerator = function (config) {
    var isWrapLines = GetValue(config, 'wrap', false);
    var BaseClass = (!isWrapLines) ? Sizer : FixWidthSizer;

    class TweakerShell extends BaseClass {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            if (config.orientation === undefined) {
                config.orientation = (!isWrapLines) ? 1 : 0;
            }

            // Create sizer
            super(scene, config);
            this.type = 'rexTweakerShell';
            this.isWrapLines = isWrapLines;

            this.root = config.root || this;

            this.styles = GetValue(config, 'styles') || {};
            this.styles.orientation = this.orientation;

            this.itemWidth = GetValue(config, 'itemWidth', 0);

            if ((this.root === this) && (this.orientation === 1)) {
                var alignTitle = GetValue(config, 'inputRow.alignTitle');
                if (alignTitle === undefined) {
                    var titleProportion = GetValue(this.styles, 'inputRow.proportion.title');
                    alignTitle = (!titleProportion);

                } else {
                    if (alignTitle) {  // Override title proportion to 0
                        SetValue(this.styles, 'inputRow.proportion.title', 0);
                    }

                }
                this.alignInputRowTitle = alignTitle;

            } else {
                this.alignInputRowTitle = false;
                this.inputHandlers = this.root.inputHandlers;

            }


            var background = CreateBackground(scene, undefined, config.background);
            if (background) {
                this.addBackground(background);
            }
        }

        preLayout() {
            super.preLayout();

            if (this.alignInputRowTitle) {
                this.setInputRowTitleWidth(this.getMaxInputRowTitleWidth());
            }
        }

        createTweaker(config, addToScene) {
            if (addToScene === undefined) {
                addToScene = true;
            }

            var TweakerShellClass = TweakerShellClassGenerator(config);
            var gameObject = new TweakerShellClass(this.scene, config);
            if (addToScene) {
                this.scene.add.existing(gameObject);
            }

            return gameObject;
        }

        add(gameObject, config) {
            if (gameObject.setMinWidth) {
                gameObject.setMinWidth(this.itemWidth);
            }

            super.add(gameObject, config);
            return this;
        }

    }

    Object.assign(
        TweakerShell.prototype,
        Methods
    );

    return TweakerShell;
}



export default TweakerShellClassGenerator;