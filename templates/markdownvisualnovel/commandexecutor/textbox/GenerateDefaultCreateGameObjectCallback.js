import { SimpleTextBox } from '../../../ui/ui-components.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';

var GenerateDefaultCreateGameObjectCallback = function (style = {}) {
    return function (
        scene,
        {
            width = 0,
            height = 0
        } = {}
    ) {
        var wrapWidth = Math.max(0, width - 20);

        SetValue(style, 'text.fixedWidth', width);
        SetValue(style, 'text.fixedHeight', height);
        SetValue(style, 'text.wordWrap.width', wrapWidth)

        var textBox = new SimpleTextBox(scene, style);

        textBox
            .setMinSize(width, height)
            .setOrigin(0.5, 1)
            .layout();

        scene.add.existing(textBox);

        textBox
            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action');
                this.setChildAlpha(icon, 0);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, textBox)
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
            }, textBox)

        return textBox;
    }
}

export default GenerateDefaultCreateGameObjectCallback;