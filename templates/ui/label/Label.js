import LabelBase from './Base.js';
import AddChildMask from '../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Label extends LabelBase {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexLabel';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var icon = GetValue(config, 'icon', undefined);
        var text = GetValue(config, 'text', undefined);
        var action = GetValue(config, 'action', undefined);
        // Align
        var align = GetValue(config, 'align', undefined); // undefined/left/top: no space

        if (background) {
            this.addBackground(background);
        }

        // Add space
        if (
            (align === 'right') ||
            (align === 'bottom') ||
            (align === 'center')
        ) {
            this.addSpace();
        }

        if (icon) {
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

            if (!fitRatio) {
                var iconSize = GetValue(config, 'iconSize', undefined);
                this.setIconSize(
                    GetValue(config, 'iconWidth', iconSize),
                    GetValue(config, 'iconHeight', iconSize)
                );
            }
        }


        if (text) {
            var textSpace = GetValue(config, 'space.text', 0);
            var expandTextWidth = GetValue(config, 'expandTextWidth', false);
            var expandTextHeight = GetValue(config, 'expandTextHeight', false);
            var proportion, padding, expand;
            if (this.orientation === 0) {
                proportion = (expandTextWidth) ? 1 : 0;
                if (action) {
                    padding = { right: textSpace };
                }
                expand = expandTextHeight;
            } else {
                proportion = (expandTextHeight) ? 1 : 0;
                if (action) {
                    padding = { bottom: textSpace };
                }
                expand = expandTextWidth;
            }

            this.add(
                text,
                { proportion: proportion, expand: expand, padding: padding, }
            );
        }

        if (action) {
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

            if (!fitRatio) {
                var actionSize = GetValue(config, 'actionSize');
                this.setActionSize(
                    GetValue(config, 'actionWidth', actionSize),
                    GetValue(config, 'actionHeight', actionSize)
                );
            }
        }

        // Add space
        if (align === 'center') {
            this.addSpace();
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('icon', icon);
        this.addChildrenMap('text', text);
        this.addChildrenMap('action', action);
    }
}

export default Label;