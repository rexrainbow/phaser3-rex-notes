import LabelBase from './Base';
import AddChildCircleMask from '../utils/AddChildCircleMask';

import SetWrapMode from '../../../plugins/utils/text/SetWrapMode';
import WrapExpandText from '../utils/wrapexpandtext/WrapExpandText';
import FontSizeExpandText from '../utils/fontsizeexpandtext/FontSizeExpandText';
import IsBitmapTextGameObject from '../../../plugins/utils/bitmaptext/IsBitmapTextGameObject';


import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Label extends LabelBase {
    add: any;
    addBackground: any;
    addChildrenMap: any;
    orientation: any;
    setActionSize: any;
    setChildrenAlignMode: any;
    setIconSize: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexLabel';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var icon = GetValue(config, 'icon', undefined);
        var iconMask = GetValue(config, 'iconMask', undefined);
        var text = GetValue(config, 'text', undefined);
        var action = GetValue(config, 'action', undefined);
        var actionMask = GetValue(config, 'actionMask', undefined);
        // Align
        var align = GetValue(config, 'align', undefined); // undefined/left/top: no space


        if (background?: any) {
            this.addBackground(background);
        }

        if (icon?: any) {
            var padding;
            if (this.orientation === 0) {
                if (text || action) {
                    padding = {
                        right: GetValue(config, 'space.icon', 0),
                        top: GetValue(config, 'space.iconTop', 0),
                        bottom: GetValue(config, 'space.iconBottom', 0),
                        left: GetValue(config, 'space.iconLeft', 0),
                    };
                }
            } else {
                if (text || action) {
                    padding = {
                        bottom: GetValue(config, 'space.icon', 0),
                        left: GetValue(config, 'space.iconLeft', 0),
                        right: GetValue(config, 'space.iconRight', 0),
                        top: GetValue(config, 'space.iconTop', 0),
                    };
                }
            }
            var fitRatio = GetValue(config, 'squareFitIcon', false) ? 1 : 0;

            this.add(
                icon,
                { proportion: 0, padding: padding, fitRatio: fitRatio }
            );

            if (iconMask?: any) {
                iconMask = AddChildCircleMask(this, icon);
            }

            if (!fitRatio) {
                var iconSize = GetValue(config, 'iconSize', undefined);
                this.setIconSize(
                    GetValue(config, 'iconWidth', iconSize),
                    GetValue(config, 'iconHeight', iconSize)
                );
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

            var textSpace = GetValue(config, 'space.text', 0);
            var expandTextWidth = GetValue(config, 'expandTextWidth', false);
            var expandTextHeight = GetValue(config, 'expandTextHeight', false);
            var proportion, padding, expand, textAlign;
            var textAlign = (wrapText && IsBitmapTextGameObject(text)) ? 'left' : undefined;
            if (this.orientation === 0) {
                proportion = (expandTextWidth) ? 1 : 0;
                if (action?: any) {
                    padding = { right: textSpace };
                }
                expand = expandTextHeight;



            } else {
                proportion = (expandTextHeight) ? 1 : 0;
                if (action?: any) {
                    padding = { bottom: textSpace };
                }
                expand = expandTextWidth;
            }

            this.add(
                text,
                { proportion: proportion, expand: expand, padding: padding, align: textAlign }
            );
        }

        if (action?: any) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    top: GetValue(config, 'space.actionTop', 0),
                    bottom: GetValue(config, 'space.actionBottom', 0),
                    right: GetValue(config, 'space.actionRight', 0),
                };
            } else {
                padding = {
                    left: GetValue(config, 'space.actionLeft', 0),
                    right: GetValue(config, 'space.actionRight', 0),
                    bottom: GetValue(config, 'space.actionBottom', 0),
                };
            }
            var fitRatio = GetValue(config, 'squareFitAction', false) ? 1 : 0;
            this.add(
                action,
                { proportion: 0, padding: padding, fitRatio: fitRatio }
            );

            if (actionMask?: any) {
                actionMask = AddChildCircleMask(this, action);
            }

            if (!fitRatio) {
                var actionSize = GetValue(config, 'actionSize');
                this.setActionSize(
                    GetValue(config, 'actionWidth', actionSize),
                    GetValue(config, 'actionHeight', actionSize)
                );
            }
        }

        this.setChildrenAlignMode(align);

        this.addChildrenMap('background', background);
        this.addChildrenMap('icon', icon);
        this.addChildrenMap('iconMask', iconMask);
        this.addChildrenMap('text', text);
        this.addChildrenMap('action', action);
        this.addChildrenMap('actionMask', actionMask);
    }
}

export default Label;