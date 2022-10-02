import Sizer from '../../sizer/Sizer.js';
import AddChildMask from '../../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var Build = function (scene, config) {
    // Add elements
    var background = GetValue(config, 'background', undefined);
    var icon = GetValue(config, 'icon', undefined);
    var iconMask = GetValue(config, 'iconMask', undefined);
    var nameText = GetValue(config, 'nameText', undefined);
    var valueText = GetValue(config, 'valueText', undefined);
    var progress = GetValue(config, 'progress', undefined);
    var action = GetValue(config, 'action', undefined);
    var actionMask = GetValue(config, 'actionMask', undefined);

    var hasTextSizer = nameText || valueText || progress;

    if (background) {
        this.addBackground(background);
    }

    if (icon) {
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

        if (iconMask) {
            iconMask = AddChildMask.call(this, icon, icon, 1); // Circle mask
        }
    }

    if (hasTextSizer) {
        var textSizer = new Sizer(scene, {
            orientation: 1,
        })

        var nameValueSizer;
        if (nameText || valueText) {
            var textAlign = GetValue(config, 'align.text', 'bottom');
            if (textAlign === 'bottom') {
                textSizer.addSpace();
            }

            nameValueSizer = new Sizer(scene, {
                orientation: 0,
            })

            if (nameText) {
                nameText.setOrigin(0, nameText.originY);
                var padding = {
                    left: GetValue(config, 'space.name', 0),
                }
                nameValueSizer.add(
                    nameText,
                    { padding: padding }
                );
            }

            if (valueText) {
                valueText.setOrigin(1, valueText.originY);

                nameValueSizer.addSpace();

                var padding = {
                    right: GetValue(config, 'space.value', 0),
                }
                nameValueSizer.add(
                    valueText,
                    { padding: padding }
                );
            }

            textSizer.add(
                nameValueSizer,
                { proportion: 1, expand: true, }
            )
        }

        if (progress) {
            var padding = {
                top: (nameValueSizer) ? GetValue(config, 'space.progress', 0) : 0,
                bottom: GetValue(config, 'space.progressBottom', 0),
                left: GetValue(config, 'space.progressLeft', 0),
                right: GetValue(config, 'space.progressRight', 0),
            };
            textSizer.add(
                progress,
                { expand: true, padding: padding }
            );
        }

        var padding = undefined;
        if (action) {
            padding = {
                right: GetValue(config, 'space.text', 0)
            };
        }
        this.add(
            textSizer,
            { proportion: 1, expand: true, padding: padding }
        );
    }

    if (action) {
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

        if (actionMask) {
            actionMask = AddChildMask.call(this, action, action, 1); // Circle mask
        }
    }

    this.addChildrenMap('background', background);
    this.addChildrenMap('icon', icon);
    this.addChildrenMap('iconMask', iconMask);
    this.addChildrenMap('name', nameText);
    this.addChildrenMap('value', valueText);
    this.addChildrenMap('progress', progress);
    this.addChildrenMap('action', action);
    this.addChildrenMap('actionMask', actionMask);
}

export default Build;
