import Image from '../image/Image.js';
import RenderTexture from '../rendertexture/RenderTexture.js';

const DefaultImageConfig = { key: '__WHITE' };

var CreateFace = function (scene, config) {
    if (config === undefined) {
        config = DefaultImageConfig;
    }

    var face;
    if (config instanceof Image) {
        face = config;
    } else {
        if (config.hasOwnProperty('key')) {
            face = new Image(scene,
                0, 0,
                config.key, config.frame,
                { hideCCW: true }
            );
        } else if (config.hasOwnProperty('width')) {
            face = new RenderTexture(scene,
                0, 0,
                config.width, config.height,
                { hideCCW: true }
            );
        }

        scene.add.existing(face);
    }

    return face;
}

export default CreateFace;