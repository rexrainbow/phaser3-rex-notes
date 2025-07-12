import ImageBoxBase from '../../plugins/gameobjects/image/imagebox/ImageBoxBase.js';
import SpinnerMethods from './SpinnerMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class LazyLoadImageBox extends ImageBoxBase {
    constructor(scene, config) {
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var width = GetValue(config, 'width', 0);
        var height = GetValue(config, 'height', 0);
        super(scene, x, y, width, height);
        this.type = 'rexLazyLoadImageBox';

        this.scaleUp = GetValue(config, 'scaleUp', false);

        var background = GetValue(config, 'background');
        this.setBackground(background);

        var image = GetValue(config, 'image');
        this.setImage(image);

        var texture = GetValue(config, 'key', undefined);
        var frame = GetValue(config, 'frame', undefined);
        var url = GetValue(config, 'url', undefined);
        this.setTexture(texture, frame, url);

        var spinner = GetValue(config, 'spinner');
        this.setSpinner(spinner);

        this.resize(width, height);
    }


    setTexture(texture, frame, url) {
        this._textureKey = texture;
        this._frameName = frame;
        var scene = this.scene;
        var runLazyLoading = !scene.sys.textures.exists(texture);

        if (runLazyLoading && !!texture && !!url) {
            super.setTexture();
            this.startSpinner();

            // Lazy loading
            var self = this;
            var callback = super.setTexture;
            scene.load.image(texture, url)
                .once(`filecomplete-image-${texture}`, function (key) {
                    // This Image game object might be destroyed -> scene = undefined
                    if (!!self.scene && (key === self._textureKey)) {
                        callback.call(self, texture, frame);
                        self.stopSpinner();
                    }
                })
                .start();

        } else {
            super.setTexture(texture, frame);
            this.stopSpinner();
        }

        return this;
    }

    resize(width, height) {
        super.resize(width, height);

        this.resizeSpinner();
        return this;
    }
}

Object.assign(
    LazyLoadImageBox.prototype,
    SpinnerMethods,
)

export default LazyLoadImageBox;