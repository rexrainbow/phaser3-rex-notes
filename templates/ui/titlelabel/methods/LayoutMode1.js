/*
Elements:

Title      Title       Title
Separator  Separator   Separator
Icon       Text        ActionIcon 

*/

import Sizer from '../../sizer/Sizer.js';
import AddChildMask from '../../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var LayoutMode1 = function (config) {
    this.setOrientation(1);
    this.setRTL(false);

    var scene = this.scene;

    // Add elements
    var title = GetValue(config, 'title', undefined);
    var separator = GetValue(config, 'separator', undefined);
    var innerBackground = GetValue(config, 'innerBackground', undefined);
    var icon = GetValue(config, 'icon', undefined);
    var iconMask = GetValue(config, 'iconMask', undefined);
    var text = GetValue(config, 'text', undefined);
    var action = GetValue(config, 'action', undefined);
    var actionMask = GetValue(config, 'actionMask', undefined);


    if (title) {
        var align = GetValue(config, 'align.title', 'left');
        var expandTitleWidth = GetValue(config, 'expandTitleWidth', false);
        var expandTitleHeight = GetValue(config, 'expandTitleHeight', false);
        var proportion, padding, expand;
        proportion = (expandTitleHeight) ? 1 : 0;
        expand = expandTitleWidth;
        padding = {
            bottom: GetValue(config, 'space.title', 0),
            left: GetValue(config, 'space.titleLeft', 0),
            right: GetValue(config, 'space.titleRight', 0),
        }
        this.add(
            title,
            { proportion: proportion, expand: expand, align: align, padding: padding }
        );
    }

    if (separator) {
        var separatorSpace = GetValue(config, 'space.separator', 0);
        var padding = {
            top: (title) ? separatorSpace : 0,
            bottom: (text) ? separatorSpace : 0,
            left: GetValue(config, 'space.separatorLeft', 0),
            right: GetValue(config, 'space.separatorRight', 0),
        };
        this.add(
            separator,
            { proportion: 0, expand: true, padding: padding }
            // Fixed height, expand width
        );
    }

    var orientation = GetValue(config, 'orientation', 0);
    var innerSizer = new Sizer(scene, {
        orientation: orientation,
        rtl: GetValue(config, 'rtl', false),

        space: {
            left: GetValue(config, 'space.innerLeft', 0),
            right: GetValue(config, 'space.innerRight', 0),
            top: GetValue(config, 'space.innerTop', 0),
            bottom: GetValue(config, 'space.innerBottom', 0),
        }
    })
    if (innerBackground) {
        innerSizer.addBackground(innerBackground);
    }

    this.add(
        innerSizer,
        { proportion: 1, expand: true }
    );

    if (icon) {
        var align = GetValue(config, 'align.icon', 'center');
        var padding;
        if (innerSizer.orientation === 0) {
            padding = {
                right: GetValue(config, 'space.icon', 0),
                top: GetValue(config, 'space.iconTop', 0),
                bottom: GetValue(config, 'space.iconBottom', 0),
                left: GetValue(config, 'space.iconLeft', 0),
            };
        } else {
            padding = {
                bottom: GetValue(config, 'space.icon', 0),
                left: GetValue(config, 'space.iconLeft', 0),
                right: GetValue(config, 'space.iconRight', 0),
                top: GetValue(config, 'space.iconTop', 0),
            };
        }
        var fitRatio = GetValue(config, 'squareFitIcon', false) ? 1 : 0;

        innerSizer.add(
            icon,
            { proportion: 0, align: align, padding: padding, fitRatio: fitRatio }
        );

        if (iconMask) {
            iconMask = AddChildMask.call(this, icon, icon, 1); // Circle mask
        }

        if (!fitRatio) {
            var iconSize = GetValue(config, 'iconSize', undefined);
            this.setIconSize(
                GetValue(config, 'iconWidth', iconSize),
                GetValue(config, 'iconHeight', iconSize)
            );
        }
    }

    if (text) {
        var align = GetValue(config, 'align.text', 'left');
        var textSpace = GetValue(config, 'space.text', 0);
        var expandTextWidth = GetValue(config, 'expandTextWidth', false);
        var expandTextHeight = GetValue(config, 'expandTextHeight', false);
        var proportion, padding, expand;
        if (innerSizer.orientation === 0) {
            proportion = (expandTextWidth) ? 1 : 0;
            if (action) {
                padding = { right: textSpace };
            }
            expand = expandTextHeight;
        } else {
            proportion = (expandTextHeight) ? 1 : 0;
            if (action) {
                padding = {
                    bottom: textSpace
                };
            }
            expand = expandTextWidth;
        }

        innerSizer.add(
            text,
            { proportion: proportion, expand: expand, align: align, padding: padding }
        );
    }

    if (action) {
        var align = GetValue(config, 'align.action', 'center');
        var padding;
        if (innerSizer.orientation === 0) {
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

        innerSizer.add(
            action,
            { proportion: 0, align: align, padding: padding, fitRatio: fitRatio }
        );

        if (actionMask) {
            actionMask = AddChildMask.call(this, action, action, 1); // Circle mask
        }

        if (!fitRatio) {
            var actionSize = GetValue(config, 'actionSize');
            this.setActionSize(
                GetValue(config, 'actionWidth', actionSize),
                GetValue(config, 'actionHeight', actionSize)
            );
        }
    }

    this.addChildrenMap('title', title);
    this.addChildrenMap('separator', separator);
    this.addChildrenMap('innerSizer', innerSizer);
    this.addChildrenMap('innerBackground', innerBackground);
    this.addChildrenMap('icon', icon);
    this.addChildrenMap('iconMask', iconMask);
    this.addChildrenMap('text', text);
    this.addChildrenMap('action', action);
    this.addChildrenMap('actionMask', actionMask);
}

export default LayoutMode1;