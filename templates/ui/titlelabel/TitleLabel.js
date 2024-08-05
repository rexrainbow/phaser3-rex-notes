import LabelBase from '../label/Base.js';
import LayoutMode0 from './methods/LayoutMode0.js';
import LayoutMode1 from './methods/LayoutMode1.js';

import SetWrapMode from '../../../plugins/utils/text/SetWrapMode.js';
import WrapExpandText from '../utils/wrapexpandtext/WrapExpandText.js';
import FontSizeExpandText from '../utils/fontsizeexpandtext/FontSizeExpandText.js';


const GetValue = Phaser.Utils.Objects.GetValue;
const LayoutCallbacks = [LayoutMode0, LayoutMode1];

class TitleLabel extends LabelBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexTitleLabel';

        // Add Background
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }

        // Wrap title, text
        var title = GetValue(config, 'title', undefined);
        var text = GetValue(config, 'text', undefined);

        if (title) {
            var wrapTitle = GetValue(config, 'wrapTitle', false);
            var adjustTitleFontSize = GetValue(config, 'adjustTitleFontSize', false);
            if (wrapTitle) {
                if (wrapTitle === true) {
                    wrapTitle = 'word';
                }

                SetWrapMode(title, wrapTitle);
                config.expandTitleWidth = true;
                WrapExpandText(title);

            } else if (adjustTitleFontSize) {
                config.expandTextWidth = true;
                config.expandTextHeight = true;
                FontSizeExpandText(title, { fitHeight: true });

            }
        }

        if (text) {
            var wrapText = GetValue(config, 'wrapText', false);
            var adjustTextFontSize = GetValue(config, 'adjustTextFontSize', false);
            if (wrapText) {
                if (wrapText === true) {
                    wrapText = 'word';
                }

                SetWrapMode(text, wrapText);
                config.expandTextWidth = true;
                WrapExpandText(text);

            } else if (adjustTextFontSize) {
                config.expandTextWidth = true;
                config.expandTextHeight = true;
                FontSizeExpandText(text, { fitHeight: true });

            }
        }

        var layoutMode = GetValue(config, 'layoutMode', 0);
        var layoutCallback = LayoutCallbacks[layoutMode] || LayoutCallbacks[0];
        layoutCallback.call(this, config);

        // Elements : title, separator, innerBackground,
        //            icon, iconMask, text, action, actionMask, background
        //            innerSizer
        this.addChildrenMap('background', config.background);

    }

    // Access title game object
    get title() {
        var textObject = this.childrenMap.title;
        if (!textObject) {
            return '';
        }
        return textObject.title;
    }

    set title(value) {
        var textObject = this.childrenMap.title;
        if (!textObject) {
            return;
        }
        textObject.setText(value);
    }

    setTitle(value) {
        this.title = value;
        return this;
    }

    resetDisplayContent(config) {
        if (config === undefined) {
            config = {};
        } else if (typeof (config) === 'string') {
            config = {
                text: config,
            }
        }

        super.resetDisplayContent(config);

        var textObject = this.childrenMap.title;
        if (textObject) {
            if (config.title === undefined) {
                // Do nothing
            } else if (config.title) {
                this.show(textObject);
                this.setTitle(config.title);
            } else { // false, null
                this.hide(textObject);
            }
        }

        return this;
    }
}

export default TitleLabel;