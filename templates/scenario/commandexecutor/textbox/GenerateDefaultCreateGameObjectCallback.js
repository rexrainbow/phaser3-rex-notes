import SimpleTextBox from '../../../ui/simpletextbox/SimpleTextBox.js';
import TransitionImagePack from '../../../ui/transitionimagepack/TransitionImagePack.js';
import AIOSpinner from '../../../ui/aiospinner/AIOSpinner.js';
import DecorateGameObject from '../../../ui/utils/build/DecorateGameObject.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';
import KeyMap from '../../../../plugins/utils/input/KeyMap.js';
import { AddShakeBehavior } from '../utils/Shake.js';


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

            clickTarget,
            clickShortcutKeys,
            fastTypingShortcutKeys,

            commandExecutor, eventSheetManager, eventsheet,
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

        var useDefaultWaitIcon = false;
        if (!creators.hasOwnProperty('action')) {
            creators.action = function (scene, config) {
                if (config === undefined) {
                    config = {};
                }
                var gameObject = new AIOSpinner(scene, config);
                DecorateGameObject(gameObject, config);

                scene.add.existing(gameObject);
                return gameObject;
            }

            useDefaultWaitIcon = true;
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

        var waitIcon;
        if (useDefaultWaitIcon) {
            waitIcon = gameObject.getElement('action');
            gameObject.setChildVisible(waitIcon, false);
        }

        AddShakeBehavior(gameObject);

        /*
        Fire textbox's 'click' event when
        - Pointer-down on clickTarget (screen or this textbox) 
        - Press keyboard's key
        
        !!! note
            Since 'click' event might fire during typing, don't use *wait pointerdown|keydown*
        */

        gameObject.emitClick = function () {
            gameObject.emit('click');
        }

        var touchEE;
        if (clickTarget === undefined) {
            clickTarget = eventSheetManager.getData('$clickTarget');
        }
        if (clickTarget === null) {
            // No click target
        } else if (clickTarget.toLowerCase() === 'screen') {
            touchEE = commandExecutor.sys.anyTouchDetector;
        } else {
            touchEE = gameObject.setInteractive();
        }

        if (touchEE) {
            gameObject.bindEvent(
                touchEE,               // eventEmitter, 
                'pointerdown',         // eventName
                function () {          // callback
                    gameObject.emitClick()
                }
            );
        }

        gameObject.bindEvent(
            scene.input.keyboard,      // eventEmitter
            'keydown',                 // eventName
            function (event) {         // callback
                if (clickShortcutKeys === undefined) {
                    clickShortcutKeys = eventSheetManager.getData('$clickShortcutKeys');
                }
                if (!clickShortcutKeys) {
                    return;
                }

                var keys = clickShortcutKeys.split('|');
                var inputKey = KeyMap[event.keyCode]
                if (keys.indexOf(inputKey) !== -1) {
                    gameObject.emitClick();
                }
            }
        );

        // On click
        var OnClick = function () {
            if (gameObject.isTyping) {
                // Wait clicking for typing next page, 
                // or emitting 'complete2' event
                gameObject
                    .once('click', OnClick)
                    .stop(true);

            } else if (!gameObject.isLastPage) {
                // !gameObject.isLastPage && !gameObject.isTyping
                // Typing next page, interrupted by click event
                gameObject
                    .once('click', OnClick)
                    .typeNextPage();

            } else if (!gameObject.complete2Flag) {
                gameObject.complete2Flag = true;
                gameObject.emit('complete2');

            }
        }

        /*
        PageEnd0 -> click -> PageEnd1
        PageEnd0 -> fastTyping|autoNextPage -> PageEnd1
        */
        // on 'pageend', wait click
        var PageEnd0 = function () {
            if (useDefaultWaitIcon) {
                waitIcon.start();
                gameObject.setChildVisible(waitIcon, true);
            }

            gameObject.once('click', PageEnd1);

            // $fastTyping has higher priority than $autoNextPage
            let fastTyping = eventSheetManager.getData('$fastTyping');
            let autoNextPage = eventSheetManager.getData('$autoNextPage');
            if (fastTyping || autoNextPage) {
                var autoNextPageDelay;
                if (fastTyping) {
                    autoNextPageDelay = 0;
                } else {
                    autoNextPageDelay = eventSheetManager.getData('$autoNextPageDelay');
                }

                commandExecutor.sys.timeline.delayCall(autoNextPageDelay, gameObject.emitClick);
            }

            eventSheetManager.emit('pause.input');
        }

        // on 'pageend', on 'click'
        var PageEnd1 = function () {
            if (!gameObject.isPageEnd) {
                return;
            }

            gameObject.off('click', PageEnd1);

            if (useDefaultWaitIcon) {
                waitIcon.stop();
                gameObject.setChildVisible(waitIcon, false);
            }

            eventSheetManager.emit('resume.input');
        }
        gameObject._typeNextPage = PageEnd1;

        gameObject
            .on('pageend', PageEnd0)
            .on('start', function () {
                // Remove pending callback, add new one
                gameObject
                    .off('click', OnClick)
                    .once('click', OnClick)
            });

        // Change typing speed if $fastTyping is changed
        var fastTypingSave = eventSheetManager.getData('$fastTyping');
        var autoNextPageSave = eventSheetManager.getData('$autoNextPage');
        gameObject.bindScenePreupdateEvent(function () {
            let fastTyping = eventSheetManager.getData('$fastTyping');
            let autoNextPage = eventSheetManager.getData('$autoNextPage');

            if (fastTyping !== fastTypingSave) {
                if (gameObject.isTyping) {
                    // Change typing speed
                    let typingSpeed;
                    if (fastTyping) {
                        typingSpeed = eventSheetManager.getData('$fastTypingSpeed');
                    } else if (typingSpeed === undefined) {
                        typingSpeed = gameObject.normalTypingSpeed;
                    }
                    gameObject.setTypingSpeed(typingSpeed);
                } else {
                    if (fastTyping) {
                        // Start typing next 
                        gameObject.emitClick();
                    }
                }
            } else if ((autoNextPage !== autoNextPageSave) && !fastTyping) {  // $fastTyping has higher priority than $autoNextPage
                if (gameObject.isTyping) {
                    // Do nothing
                } else {
                    if (autoNextPage) {
                        // Start typing next page
                        gameObject.emitClick();
                    }
                }
            }

            fastTypingSave = fastTyping;
            autoNextPageSave = autoNextPage;
        });


        // Set $fastTyping to true/false if any fastTypingShortcutKeys is down/up
        var SetFastTypingVariableByKeyboard = function (event, fastTypingValue) {
            if (fastTypingShortcutKeys === undefined) {
                fastTypingShortcutKeys = eventSheetManager.getData('$fastTypingShortcutKeys');
            }
            if (!fastTypingShortcutKeys) {
                return;
            }

            var keys = fastTypingShortcutKeys.split('|');
            var inputKey = KeyMap[event.keyCode]
            if (keys.indexOf(inputKey) !== -1) {
                eventSheetManager.setData('$fastTyping', fastTypingValue);
            }
        }

        gameObject.bindEvent(
            scene.input.keyboard,      // eventEmitter
            'keydown',                 // eventName
            function (event) {         // callback
                SetFastTypingVariableByKeyboard(event, true);
            }
        );
        gameObject.bindEvent(
            scene.input.keyboard,      // eventEmitter
            'keyup',                   // eventName
            function (event) {         // callback
                SetFastTypingVariableByKeyboard(event, false);
            }
        );

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;