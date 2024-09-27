import ConfirmDialog from '../../../ui/confirmdialog/ConfirmDialog.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';
import { AddShakeBehavior } from '../utils/Shake.js';

var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {},
    creators
) {

    return function (
        scene,
        {
            vpw, vph,
            width = 0, height = 0,
            vpx = 0.5, vpy = 0.5,
        } = {}
    ) {

        if (vpw !== undefined) {
            width = viewport.width * vpw;
        }

        if (vph !== undefined) {
            height = viewport.height * vph;
        }

        var gameObject = new ConfirmDialog(scene, style, creators);

        gameObject
            .setMinSize(width, height)
            .setVisible(false)

        scene.add.existing(gameObject);
        AddViewportCoordinateProperties(gameObject, viewport);

        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        AddShakeBehavior(gameObject);

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;