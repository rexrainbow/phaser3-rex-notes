import LabelBase from '../label/Base';
import LayoutMode0 from './methods/LayoutMode0';
import LayoutMode1 from './methods/LayoutMode1';

import SetWrapMode from '../../../plugins/utils/text/SetWrapMode';
import WrapExpandText from '../utils/wrapexpandtext/WrapExpandText';
import FontSizeExpandText from '../utils/fontsizeexpandtext/FontSizeExpandText';


import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const LayoutCallbacks = [LayoutMode0, LayoutMode1];

class TitleLabel extends LabelBase {
    addBackground: any;
    addChildrenMap: any;
    childrenMap: any;
    hide: any;
    show: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexTitleLabel';

        // Add Background
        var background = GetValue(config, 'background', undefined);
        if (background?: any) {
            this.addBackground(background);
        }

        // Wrap title, text
        var title = GetValue(config, 'title', undefined);
        var text = GetValue(config, 'text', undefined);

        if (title?: any) {
            var wrapTitle = GetValue(config, 'wrapTitle', false);
            var adjustTitleFontSize = GetValue(config, 'adjustTitleFontSize', false);
            if (wrapTitle?: any) {
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

        if (text?: any) {
            var wrapText = GetValue(config, 'wrapText', false);
            var adjustTextFontSize = GetValue(config, 'adjustTextFontSize', false);
            if (wrapText?: any) {
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

    setTitle(value?: any) {
        this.title = value;
        return this;
    }

    resetDisplayContent(config?: any) {
        if (config === undefined) {
            config = {};
        } else if (typeof (config) === 'string') {
            config = {
                text: config,
            }
        }

        super.resetDisplayContent(config);

        var textObject = this.childrenMap.title;
        if (textObject?: any) {
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