import { TransitionImagePack } from '../../../ui/ui-components.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';

var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {}
) {

    return function (scene, config) {
        var gameObject = new TransitionImagePack(scene, config);
        scene.add.existing(gameObject);
        AddViewportCoordinateProperties(gameObject, viewport);
        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;