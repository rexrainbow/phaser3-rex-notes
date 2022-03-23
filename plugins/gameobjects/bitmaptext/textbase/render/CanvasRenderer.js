/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2022 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var SetTransform = Phaser.Renderer.Canvas.SetTransform;

/**
 * Renders this Game Object with the Canvas Renderer to the given Camera.
 * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
 * This method should not be called directly. It is a utility function of the Render module.
 *
 * @method Phaser.GameObjects.DynamicBitmapText#renderCanvas
 * @since 3.0.0
 * @private
 *
 * @param {Phaser.Renderer.Canvas.CanvasRenderer} renderer - A reference to the current active Canvas renderer.
 * @param {Phaser.GameObjects.DynamicBitmapText} src - The Game Object being rendered in this call.
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
 * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
 */
var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
    var text = src._text;
    var textLength = text.length;

    var ctx = renderer.currentContext;

    if (textLength === 0 || !SetTransform(renderer, ctx, src, camera, parentMatrix)) {
        return;
    }

    camera.addToRenderList(src);

    var textureFrame = src.fromAtlas
        ? src.frame
        : src.texture.frames['__BASE'];

    var image = src.frame.source.image;

    ctx.translate(-src.displayOriginX, -src.displayOriginY);

    var roundPixels = camera.roundPixels;

    for (var i = 0; i < textLength; i++) {

        if (roundPixels) {
            x = Math.round(x);
            y = Math.round(y);
        }

        ctx.save();

        ctx.translate(x, y);

        ctx.rotate(rotation);

        ctx.scale(scale, scale);

        ctx.drawImage(image, glyphX, glyphY, glyphW, glyphH, 0, 0, glyphW, glyphH);

        ctx.restore();
    }

    ctx.restore();
};

export default CanvasRenderer;
