import { SimpleTextBox } from '../../../ui/ui-components.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';
import AddEvent from '../../../../plugins/utils/gameobject/addevent/AddEvent.js';

var GenerateDefaultCreateGameObjectCallback = function (style = {}) {
    var defaultFrameDelimiter = style.frameDelimiter || '-';

    return function (
        scene,
        {
            width = 0,
            height = 0,
            frameDelimiter = defaultFrameDelimiter
        } = {}
    ) {
        var wrapWidth = Math.max(0, width - 20);

        SetValue(style, 'text.fixedWidth', width);
        SetValue(style, 'text.fixedHeight', height);
        SetValue(style, 'text.wordWrap.width', wrapWidth)

        var gameObject = new SimpleTextBox(scene, style);

        gameObject
            .setMinSize(width, height)
            .setOrigin(0.5, 1)
            .layout();

        scene.add.existing(gameObject);

        gameObject
            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action');
                this.setChildAlpha(icon, 0);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, gameObject)
            .on('pageend', function () {
                if (this.isLastPage) {
                    return;
                }

                var icon = this.getElement('action');
                this.setChildAlpha(icon, 1);
                icon.y -= 30;
                var tween = scene.tweens.add({
                    targets: icon,
                    y: '+=30', // '+=100'
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false
                });
            }, gameObject)

        gameObject.frameDelimiter = frameDelimiter;

        // Hide icon element when window height > window width
        AddEvent(
            gameObject,  // target
            scene.scale, 'resize',  // eventEmitter, eventName
            // callback
            function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
                // TODO
                var icon = gameObject.getElement('icon');
                if (!icon) {
                    return;
                }

                if (baseSize.width >= baseSize.height) {
                    if (!icon.visible) {
                        gameObject.show(icon).layout();
                    }
                } else {
                    if (icon.visible) {
                        gameObject.hide(icon).layout();
                    }
                }
            }
        )

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;