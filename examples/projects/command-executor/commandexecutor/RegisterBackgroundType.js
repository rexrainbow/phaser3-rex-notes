import { BG, BGLayer } from './Const.js';

var RegisterBackgroundType = function (commandExecutor) {
    commandExecutor.addGameObjectManager({
        name: BG,
        createGameObject(scene, config) {
            return scene.rexUI.add.transitionImagePack(config);
        },
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: true,
        defaultLayer: BGLayer,

        commands: {
            cross(
                gameObject,
                {
                    key, frame,
                    duration,
                    mode = 'fade',
                    wait = true
                } = {},
                commandExecutor,
                eventSheetManager
            ) {

                // Wait until transition complete
                if (wait) {
                    commandExecutor.waitEvent(gameObject, 'complete');
                }

                var durationSave = gameObject.duration;
                if (duration !== undefined) {
                    gameObject.setDuration(duration);
                }
                gameObject.transit(key, frame, mode);
                gameObject.setDuration(durationSave);
            }
        }
    })
}

export default RegisterBackgroundType;