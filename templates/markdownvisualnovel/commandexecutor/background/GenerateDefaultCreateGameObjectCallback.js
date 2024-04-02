import { TransitionImagePack } from '../../../ui/ui-components.js';

var GenerateDefaultCreateGameObjectCallback = function (style) {
    return function (scene, config) {
        var gameObject = new TransitionImagePack(scene, config);
        scene.add.existing(gameObject);
        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;