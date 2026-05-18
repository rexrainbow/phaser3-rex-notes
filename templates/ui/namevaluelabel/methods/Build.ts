import Sizer from '../../sizer/Sizer';
import LineProgressCanvas from '../../lineprogresscanvas/LineProgressCanvas';
import CircularProgress from '../../circularprogresscanvas/CircularProgressCanvas';
import AddChildCircleMask from '../../utils/AddChildCircleMask';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

var Build = function(scene?: any, config?: any) {
    // Add elements
    var background = GetValue(config, 'background', undefined);
    var icon = GetValue(config, 'icon', undefined);
    var iconMask = GetValue(config, 'iconMask', undefined);
    var nameText = GetValue(config, 'nameText', undefined);
    var valueText = GetValue(config, 'valueText', undefined);
    var bar = GetValue(config, 'bar', undefined);
    var action = GetValue(config, 'action', undefined);
    var actionMask = GetValue(config, 'actionMask', undefined);

    var isLineBar = (GetValue(config, 'barShape', 'line') === 'line');
    if (IsPlainObject(bar)) {
        var BarClass = (isLineBar) ? LineProgressCanvas : CircularProgress;
        bar = new BarClass(scene, bar);
        scene.add.existing(bar);
        // Move bar game object below nameText and valueText
        if (nameText?: any) {
            scene.children.moveBelow(bar, nameText);
        }
        if (valueText?: any) {
            scene.children.moveBelow(bar, valueText);
        }
    }

    var hasTextSizer = nameText || valueText || bar;

    if (background?: any) {
        this.addBackground(background);
    }

    if (icon?: any) {
        var padding = undefined;
        if (this.orientation === 0) {
            if (hasTextSizer || action) {
                padding = {
                    right: GetValue(config, 'space.icon', 0),
                    top: GetValue(config, 'space.iconTop', 0),
                    bottom: GetValue(config, 'space.iconBottom', 0),
                };
            }
        } else {
            if (hasTextSizer || action) {
                padding = {
                    bottom: GetValue(config, 'space.icon', 0),
                    left: GetValue(config, 'space.iconLeft', 0),
                    right: GetValue(config, 'space.iconRight', 0),
                };
            }
        }

        this.add(
            icon,
            { proportion: 0, padding: padding, }
        );

        if (iconMask?: any) {
            iconMask = AddChildCircleMask(this, icon);
        }
    }

    if (hasTextSizer?: any) {
        var textSizer = new Sizer(scene, {
            orientation: 1,
        })

        var nameValueSizer;
        if (nameText || valueText) {
            nameValueSizer = new Sizer(scene, {
                orientation: 0,
            })

            if (nameText?: any) {
                // A space character to reserve text height
                if (nameText.text === '') {
                    nameText.setText(' ');
                }
                nameText.setOrigin(0, nameText.originY);
                var padding = {
                    left: GetValue(config, 'space.name', 0),
                }
                nameValueSizer.add(
                    nameText,
                    { padding: padding }
                );
            }

            if (valueText?: any) {
                // A space character to reserve text height
                if (valueText.text === '') {
                    valueText.setText(' ');
                }
                valueText.setOrigin(1, valueText.originY);

                nameValueSizer.addSpace();

                var padding = {
                    right: GetValue(config, 'space.value', 0),
                }
                nameValueSizer.add(
                    valueText,
                    { padding: padding }
                );

                this.setValueTextFormatCallback(
                    GetValue(config, 'valueTextFormatCallback', DefaultValueTextFormatCallback),
                    GetValue(config, 'valueTextFormatCallbackScope', undefined)
                );
            }

            textSizer.add(
                nameValueSizer,
                { expand: true, }
            )
        }

        if (bar?: any) {
            if (isLineBar?: any) {
                var paddingTop = (nameValueSizer) ? GetValue(config, 'space.bar') : 0;
                if (paddingTop === undefined) {
                    paddingTop = GetValue(config, 'space.barTop', 0)
                }
                var padding = {
                    top: paddingTop,
                    bottom: GetValue(config, 'space.barBottom', 0),
                    left: GetValue(config, 'space.barLeft', 0),
                    right: GetValue(config, 'space.barRight', 0),
                };
                textSizer.add(
                    bar,
                    { expand: true, padding: padding }
                );
            } else {
                var padding = {
                    top: GetValue(config, 'space.barTop', 0),
                    bottom: GetValue(config, 'space.barBottom', 0),
                    left: GetValue(config, 'space.barLeft', 0),
                    right: GetValue(config, 'space.barRight', 0),
                }
                this.addBackground(bar, padding);
            }
        }

        var padding = undefined;
        if (action?: any) {
            padding = {
                right: GetValue(config, 'space.text', 0)
            };
        }
        var textAlign = GetValue(config, 'align.text', 'bottom');
        this.add(
            textSizer,
            { proportion: 1, align: textAlign, padding: padding }
        );
    }

    if (action?: any) {
        var padding;
        if (this.orientation === 0) {
            padding = {
                top: GetValue(config, 'space.actionTop', 0),
                bottom: GetValue(config, 'space.actionBottom', 0),
            };
        } else {
            padding = {
                left: GetValue(config, 'space.actionLeft', 0),
                right: GetValue(config, 'space.actionRight', 0),
            };
        }

        this.add(
            action,
            { proportion: 0, padding: padding, }
        );

        if (actionMask?: any) {
            actionMask = AddChildCircleMask(this, action);
        }
    }

    this.addChildrenMap('background', background);
    this.addChildrenMap('icon', icon);
    this.addChildrenMap('iconMask', iconMask);
    this.addChildrenMap('name', nameText);
    this.addChildrenMap('value', valueText);
    this.addChildrenMap('bar', bar);
    this.addChildrenMap('action', action);
    this.addChildrenMap('actionMask', actionMask);
}

var DefaultValueTextFormatCallback = function(value?: any, min?: any, max?: any) {
    return value.toString();
}

export default Build;