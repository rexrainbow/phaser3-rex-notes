import PerspectiveImage from '../image/Image.js';

class RenderTexture extends PerspectiveImage {
    constructor(scene, x, y, width, height, config) {
        // render-texture -> texture manager -> perspective-image
        var rt = scene.make.renderTexture({ x: x, y: y, width: width, height: height, add: false });
        super(scene, x, y, rt.texture.key, null, config);
        this.type = 'rexPerspectiveRenderTexture';
        this.rt = rt;
    }
}

export default RenderTexture;