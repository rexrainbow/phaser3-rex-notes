import Sizer from '../sizer/Sizer.js';
import AddChildMask from '../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class NameValueLabel extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexTitleLabell';

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

    // Access nameText game object
    get nameText() {
        var textObject = this.childrenMap.name;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set nameText(value) {
        var textObject = this.childrenMap.name;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setNameText(value) {
        this.nameText = value;
        return this;
    }

    // Access valueText game object
    get valueText() {
        var textObject = this.childrenMap.value;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set valueText(value) {
        var textObject = this.childrenMap.value;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setValueText(value) {
        this.valueText = value;
        return this;
    }

    // Access icon game object
    setTexture(key, frame) {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return;
        }
        imageObject.setTexture(key, frame);
        return this;
    }

    get texture() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.texture;
    }

    get frame() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.frame;
    }

    runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
            return this;
        }

        super.runLayout(parent, newWidth, newHeight);
        // Pin icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.setPosition();
            this.resetChildPositionState(iconMask);
        }
        // Pin action-mask to action game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.setPosition();
            this.resetChildPositionState(actionMask);
        }
        return this;
    }

    resize(width, height) {
        super.resize(width, height);
        // Resize icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.resize();
        }
        // Resize action-mask to icon game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.resize();
        }
        return this;
    }
}

export default NameValueLabel;