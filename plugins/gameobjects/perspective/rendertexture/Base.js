import PerspectiveImage from '../image/Image.js';

class RenderTexture extends PerspectiveImage {
    constructor(scene, x, y, width, height, config) {
        // render-texture -> perspective-image
        var rt = scene.make.renderTexture({ x: x, y: y, width: width, height: height, add: false })
            .setOrigin(0.5);

        super(scene, x, y, rt.texture.key, null, config);
        this.type = 'rexPerspectiveRenderTexture';
        this.rt = rt;
    }

    destroy(fromScene) {
        super.destroy(fromScene);

        this.rt.destroy(fromScene);
        this.rt = null;
    }
}

export default RenderTexture;