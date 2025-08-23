import SimpleTitleLabel from '../../../ui/simpletitlelabel/SimpleTitleLabel.js';
import TransitionImagePack from '../../../ui/transitionimagepack/TransitionImagePack.js';
import DecorateGameObject from '../../../ui/utils/build/DecorateGameObject.js';
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
            vpx = 1, vpy = 0,
            alignLeft = false,
            alignRight = true,
            alignTop = true,
            alignBottom = false,
            text0, text1,

            commandExecutor, eventSheetManager, eventsheet,
        } = {},
    ) {

        if (vpw !== undefined) {
            width = viewport.width * vpw;
        }

        if (vph !== undefined) {
            height = viewport.height * vph;
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

        var gameObject = new SimpleTitleLabel(scene, style, creators);

        if (text0) {
            gameObject.setTitle(text0);
        }
        if (text1) {
            gameObject.setText(text1);
        }

        var originX;
        if (alignLeft) {
            originX = 0;
        } else if (alignRight) {
            originX = 1;
        } else {
            originX = 0.5
        }
        var originY;
        if (alignTop) {
            originY = 0;
        } else if (alignBottom) {
            originY = 1;
        } else {
            originY = 0.5
        }


        gameObject
            .setMinSize(width, height)
            .setOrigin(originX, originY)
            .layout();

        scene.add.existing(gameObject);

        AddViewportCoordinateProperties(gameObject, viewport);

        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        AddShakeBehavior(gameObject);

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;