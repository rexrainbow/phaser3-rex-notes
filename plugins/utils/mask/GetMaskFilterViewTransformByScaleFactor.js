import { GameObjects as PhaserGameObjects } from 'phaser';
const TransformMatrix = PhaserGameObjects.Components.TransformMatrix;

var GetMaskFilterViewTransformByScaleFactor = function (maskGameObject, scaleFactor, maskType, viewTransform) {
    // maskType: 'local' or 'world'
    if (scaleFactor === 1) {
        return maskType;
    }

    if (viewTransform === undefined) {
        viewTransform = new TransformMatrix();
    }

    var scale = 1 / scaleFactor;
    viewTransform.applyITRS(0, 0, 0, scale, scale);

    if ((maskType === 'world') && maskGameObject.parentContainer) {
        viewTransform.multiply(
            maskGameObject.parentContainer.getWorldTransformMatrix(ParentTransform),
            viewTransform
        );
    }

    return viewTransform;
}

const ParentTransform = new TransformMatrix();

export default GetMaskFilterViewTransformByScaleFactor
