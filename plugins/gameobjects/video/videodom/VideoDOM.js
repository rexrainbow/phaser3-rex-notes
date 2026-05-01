import VideoBase from '../videobase/VideoBase.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const DOMElement = PhaserGameObjects.DOMElement;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class VideoDOM extends VideoBase(DOMElement) {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        }

        if (config === undefined) {
            config = {};
        }
        var autoRound = scene.sys.scale.autoRound;
        if (width !== undefined) {
            if (autoRound) {
                width = Math.floor(width);
            }
            config.width = width;
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height;
        }

        super(scene, x, y);
        this.type = 'rexVideo';

        this
            .setElement(this.createVideoElement(config))
            .load(GetValue(config, 'src', ''));
    }

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        this.node.width = width;
        this.node.height = height;
        this.updateSize();
        return this;
    }
}

export default VideoDOM;