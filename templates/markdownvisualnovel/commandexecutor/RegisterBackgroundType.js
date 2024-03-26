import { BG } from '../const/GameObjects.js';
import { BGLayer } from '../const/Layers.js';
import { TransitionImagePack } from '../../ui/ui-components.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterBackgroundType = function (commandExecutor, config) {
    var createGameObjectCallback = GetValue(config, `creators.${BG}`, DefaultCreateGameObjectCallback);
    if (createGameObjectCallback === false) {
        return;
    }

    commandExecutor.addGameObjectManager({
        name: BG,
        createGameObject: createGameObjectCallback,
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
                eventSheetManager, eventSheet
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

var DefaultCreateGameObjectCallback = function (scene, config) {
    var gameObject = new TransitionImagePack(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default RegisterBackgroundType;