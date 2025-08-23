import TransitionImagePack from '../../../ui/transitionimagepack/TransitionImagePack.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';
import { AddShakeBehavior } from '../utils/Shake.js';

var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {},
    creators
) {

    return function (scene, config) {
        if (!config.hasOwnProperty('scaleMode')) {
            config.scaleMode = 0;
        }

        var gameObject = new TransitionImagePack(scene, config);
        scene.add.existing(gameObject);

        AddViewportCoordinateProperties(gameObject, viewport);

        var {
            vpx = 0.5, vpy = 0.5,
            vpw, vph,
            scaleMode
        } = config;

        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        if (scaleMode || (vpw !== undefined) || (vph !== undefined)) {
            if (vpw === undefined) {
                vpw = 1;
            }
            if (vph === undefined) {
                vph = 1;
            }
            var width = viewport.width * vpw;
            var height = viewport.height * vph;
            gameObject.resize(width, height);
        }

        AddShakeBehavior(gameObject);

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;