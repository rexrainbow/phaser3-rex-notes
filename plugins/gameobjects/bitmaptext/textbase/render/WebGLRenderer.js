/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2022 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;
const Utils = Phaser.Renderer.WebGL.Utils;
const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;

var tempMatrix = new TransformMatrix();

/**
 * Renders this Game Object with the WebGL Renderer to the given Camera.
 * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
 * This method should not be called directly. It is a utility function of the Render module.
 *
 * @method Phaser.GameObjects.DynamicBitmapText#renderWebGL
 * @since 3.0.0
 * @private
 *
 * @param {Phaser.Renderer.WebGL.WebGLRenderer} renderer - A reference to the current active WebGL renderer.
 * @param {Phaser.GameObjects.DynamicBitmapText} src - The Game Object being rendered in this call.
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
 * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
 */
var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
    var text = src.text;
    var textLength = text.length;

    if (textLength === 0) {
        return;
    }

    camera.addToRenderList(src);

    var pipeline = renderer.pipelines.set(src.pipeline, src);

    var result = GetCalcMatrix(src, camera, parentMatrix);

    var spriteMatrix = result.sprite;
    var calcMatrix = result.calc;

    var fontMatrix = tempMatrix;

    var frame = src.frame;
    var texture = frame.glTexture;

    var tintEffect = src.tintFill;
    var tintTL = Utils.getTintAppendFloatAlpha(src.tintTopLeft, camera.alpha * src._alphaTL);
    var tintTR = Utils.getTintAppendFloatAlpha(src.tintTopRight, camera.alpha * src._alphaTR);
    var tintBL = Utils.getTintAppendFloatAlpha(src.tintBottomLeft, camera.alpha * src._alphaBL);
    var tintBR = Utils.getTintAppendFloatAlpha(src.tintBottomRight, camera.alpha * src._alphaBR);

    var textureUnit = pipeline.setGameObject(src);

    renderer.pipelines.preBatch(src);

    for (var i = 0; i < textLength; i++) {
        charCode = text.charCodeAt(i);

        x *= scale;
        y *= scale;

        x -= src.displayOriginX;
        y -= src.displayOriginY;

        x += lineOffsetX;

        fontMatrix.applyITRS(x, y, rotation, scale, scale);

        calcMatrix.multiply(fontMatrix, spriteMatrix);

        var u0 = glyph.u0;
        var v0 = glyph.v0;
        var u1 = glyph.u1;
        var v1 = glyph.v1;

        var xw = glyphW;
        var yh = glyphH;

        var tx0 = spriteMatrix.e;
        var ty0 = spriteMatrix.f;

        var tx1 = yh * spriteMatrix.c + spriteMatrix.e;
        var ty1 = yh * spriteMatrix.d + spriteMatrix.f;

        var tx2 = xw * spriteMatrix.a + yh * spriteMatrix.c + spriteMatrix.e;
        var ty2 = xw * spriteMatrix.b + yh * spriteMatrix.d + spriteMatrix.f;

        var tx3 = xw * spriteMatrix.a + spriteMatrix.e;
        var ty3 = xw * spriteMatrix.b + spriteMatrix.f;

        if (roundPixels) {
            tx0 = Math.round(tx0);
            ty0 = Math.round(ty0);

            tx1 = Math.round(tx1);
            ty1 = Math.round(ty1);

            tx2 = Math.round(tx2);
            ty2 = Math.round(ty2);

            tx3 = Math.round(tx3);
            ty3 = Math.round(ty3);
        }

        pipeline.batchQuad(src, tx0, ty0, tx1, ty1, tx2, ty2, tx3, ty3, u0, v0, u1, v1, tintTL, tintTR, tintBL, tintBR, tintEffect, texture, textureUnit);
    }

    renderer.pipelines.postBatch(src);
};

export default WebGLRenderer;
