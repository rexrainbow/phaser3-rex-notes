import { TransitionImagePack } from '../../../ui/ui-components.js';

var GenerateDefaultCreateGameObjectCallback = function (style = {}) {
    var defaultKey = style.key;
    var defaultFrameDelimiter = style.frameDelimiter || '-';

    return function (scene, config) {
        var {
            key = defaultKey,
            name, expression,
            frameDelimiter = defaultFrameDelimiter
        } = config;

        var isFrameNameMode = !!key;
        if (isFrameNameMode) {
            if (name && expression) {
                config.frame = name + frameDelimiter + expression;
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
}

export default GenerateDefaultCreateGameObjectCallback;