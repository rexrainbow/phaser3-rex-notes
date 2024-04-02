import { SPRITE } from '../const/GameObjects.js';
import { GOLayer } from '../const/Layers.js';
import { TransitionImagePack } from '../../ui/ui-components.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterSpriteType = function (commandExecutor, config) {
    var createGameObjectCallback = GetValue(config, `creators.${SPRITE}`, DefaultCreateGameObjectCallback);
    if (createGameObjectCallback === false) {
        return;
    }

    commandExecutor.addGameObjectManager({
        name: SPRITE,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: true,
        defaultLayer: GOLayer,

        commands: {
            cross(
                gameObject,
                {
                    key, frame,
                    name, expression,
                    duration, mode = 'crossFade',
                    wait = true
                } = {},
                commandExecutor, eventSheetManager, eventSheet
            ) {

                if (gameObject.isFrameNameMode) {
                    if (!key) {
                        key = gameObject.texture.key;
                    }
                    if (name || expression) {
                        var frameDelimiter = gameObject.frameDelimiter;
                        var tokens = gameObject.frame.name.split(frameDelimiter);
                        name = name || tokens[0];
                        expression = expression || tokens[1];
                        frame = `${name}${frameDelimiter}${expression}`;
                    }

                } else {
                    key = name || gameObject.texture.key;
                    frame = expression || gameObject.frame.name;

                }

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
    var {
        key,
        name, expression,
        frameDelimiter = '-'
    } = config;

    var isFrameNameMode = !!key;
    if (isFrameNameMode) {
        if (name && expression) {
            config.frame = `${name}${frameDelimiter}${expression}`;
        }
    } else {
        config.key = name;
        config.frame = expression;
    }

    var gameObject = new TransitionImagePack(scene, config);
    scene.add.existing(gameObject);

    gameObject.isFrameNameMode = isFrameNameMode;
    gameObject.frameDelimiter = frameDelimiter;

    return gameObject;
}

export default RegisterSpriteType;