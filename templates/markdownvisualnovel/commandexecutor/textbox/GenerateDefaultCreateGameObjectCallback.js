import { SimpleTextBox } from '../../../ui/ui-components.js';
import { TransitionImagePack } from '../../../ui/ui-components.js';
import DecorateGameObject from '../../../ui/utils/build/DecorateGameObject.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';
import AddEvent from '../../../../plugins/utils/gameobject/addevent/AddEvent.js';
import KeyMap from '../../../../plugins/utils/input/KeyMap.js';

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

            frameDelimiter = defaultFrameDelimiter,

            eventSheetManager, eventsheet,
            clickTarget,
            clickShortcutKeys
        } = {},
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

        AddViewportCoordinateProperties(gameObject, viewport);

        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        gameObject.frameDelimiter = frameDelimiter;

        /*
        Fire 'click' event when

        - Pointer-down on clickTarget (screen or this textbox) 
        - Press keyboard's key

        */

        var onClick = function () {
            gameObject.emit('click');
        }

        var touchEE;
        if (clickTarget === undefined) {
            clickTarget = eventSheetManager.getData('$clickTarget');
        }
        if (clickTarget === null) {
            // No click target
        } else if (clickTarget.toLowerCase() === 'screen') {
            touchEE = scene.input;
        } else {
            touchEE = gameObject.setInteractive();
        }

        if (touchEE) {
            AddEvent(
                gameObject,              // target
                touchEE, 'pointerdown',  // eventEmitter, eventName
                onClick                  // callback
            );
        }

        AddEvent(
            gameObject,                       // target
            scene.input.keyboard, 'keydown',  // eventEmitter, eventName
            function (event) {                // callback
                if (clickShortcutKeys === undefined) {
                    clickShortcutKeys = eventSheetManager.getData('$clickShortcutKeys');
                }
                if (!clickShortcutKeys) {
                    return;
                }

                var keys = clickShortcutKeys.split('|');
                var inputKey = KeyMap[event.keyCode]
                if (keys.indexOf(inputKey) !== -1) {
                    onClick();
                }
            }
        );

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;