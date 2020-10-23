import Image from '../image/Image.js';
import RenderTexture from '../rendertexture/RenderTexture.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DefaultImageConfig = { key: '__WHITE' };

var CreatePerspectiveObject = function (scene, config) {
    if (config === undefined) {
        config = DefaultImageConfig;
    }

    var perspectiveObject;
    if (IsPlainObject(config)) {
        if (!config.hasOwnProperty('type')) {
            if (config.hasOwnProperty('key')) {
                config.type = 'image';
            } else if (config.hasOwnProperty('width')) {
                config.type = 'rendertexture';
            }
        }

        switch (config.type) {
            case 'image':
                perspectiveObject = new Image(scene,
                    0, 0,
                    config.key, config.frame
                );
                break;

            case 'rendertexture':
                perspectiveObject = new RenderTexture(scene,
                    0, 0,
                    config.width, config.height
                );
                break;
        }

        scene.add.existing(perspectiveObject);
    } else {
        perspectiveObject = config;
    }

    return perspectiveObject;
}

export default CreatePerspectiveObject;