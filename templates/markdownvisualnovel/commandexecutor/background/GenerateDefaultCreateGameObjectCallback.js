import { TransitionImagePack } from '../../../ui/ui-components.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';

var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {},
    creators
) {

    return function (scene, config) {
        var gameObject = new TransitionImagePack(scene, config);
        scene.add.existing(gameObject);

        AddViewportCoordinateProperties(gameObject, viewport);

        var {
            vpx = 0.5, vpy = 0.5,
            vpw, vph,
            scaleMode,

        } = config;

        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        if ((vpw !== undefined) || (vph !== undefined)) {
            var width = (vpw !== undefined) ? viewport.width * vpw : gameObject.width;
            var height = (vph !== undefined) ? viewport.height * vph : gameObject.height;

            if (scaleMode) {
                var scaleX = width / gameObject.width;
                var scaleY = height / gameObject.height;
                var scale;

                scaleMode = scaleMode.toUpperCase();
                switch (scaleMode) {
                    case 'FIT':
                        scale = Math.min(scaleX, scaleY);
                        break;

                    case 'ENVELOP':
                        scale = Math.max(scaleX, scaleY);
                        break;
                }
                gameObject.setScale(scale);

            } else {
                gameObject.setDisplaySize(width, height);

            }
        }



        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;