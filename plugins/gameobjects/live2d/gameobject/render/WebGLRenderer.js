// const Utils = Phaser.Renderer.WebGL.Utils;
const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
    renderer.pipelines.clear();

    var calcMatrix = GetCalcMatrix(src, camera, parentMatrix).calc;
    
    src.model.draw(calcMatrix);

    renderer.pipelines.rebind();
};

export default WebGLRenderer;