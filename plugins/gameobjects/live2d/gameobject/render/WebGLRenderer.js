// const Utils = Phaser.Renderer.WebGL.Utils;
const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
    var manager = renderer.pipelines;

    if (renderer.newType) {
        manager.clear();
    }

    camera.addToRenderList(src);

    var calcMatrix = GetCalcMatrix(src, camera, parentMatrix).calc;

    src.model.draw(calcMatrix);

    if (!renderer.nextTypeMatch) {
        manager.rebind();
    }
};

export default WebGLRenderer;