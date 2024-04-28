import { SimpleTextBox } from '../../../ui/ui-components.js';
import { TransitionImagePack } from '../../../ui/ui-components.js';
import DecorateGameObject from '../../../ui/utils/build/DecorateGameObject.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';

var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {},
    creators
) {

    var defaultFrameDelimiter = style.frameDelimiter || '-';

    return function (
        scene,
        {
            vpw, vph,
            width = 0, height = 0,
            vpx = 0.5, vpy = 1,

            frameDelimiter = defaultFrameDelimiter
        } = {}
    ) {

        if (vpw !== undefined) {
            width = viewport.width * vpw;
        }

        if (vph !== undefined) {
            height = viewport.height * vph;
        }

        if (width > 0) {
            SetValue(style, 'expandTextWidth', true);
        }
        if (height > 0) {
            SetValue(style, 'expandTextHeight', true);
        }

        if (creators === undefined) {
            creators = {};
        }

        if (!creators.hasOwnProperty('icon')) {
            creators.icon = function (scene, config) {
                var gameObject = new TransitionImagePack(scene, config);
                DecorateGameObject(gameObject, config);
                gameObject.setOrigin(0.5, 1);

                scene.add.existing(gameObject);
                return gameObject;
            }
        }

        var gameObject = new SimpleTextBox(scene, style, creators);

        gameObject
            .setMinSize(width, height)
            .setOrigin(0.5, 1)  // Align to bottom
            .layout();

        scene.add.existing(gameObject);

        gameObject
            .setInteractive()
            .on('complete', function () {
                // Wait addition pointerdown after complete
                this.complete2 = true;
            }, gameObject)
            .on('pointerdown', function () {
                if (this.complete2) {
                    this.complete2 = false;
                    this.emit('complete2');
                    return;
                }

                // Decorator
                var icon = this.getElement('action');
                this.setChildAlpha(icon, 0);

                // Show this page, or typing next page
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

                // Decorator
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

        AddViewportCoordinateProperties(gameObject, viewport);

        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;