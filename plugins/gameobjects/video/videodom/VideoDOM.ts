import VideoBase from '../videobase/VideoBase';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const DOMElement = PhaserGameObjects.DOMElement;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class VideoDOM extends VideoBase(DOMElement) {
    height: any;
    width: any;

    createVideoElement: any;
    node: any;
    type: any;
    updateSize: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
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
            if (autoRound?: any) {
                width = Math.floor(width);
            }
            config.width = width;
        }
        if (height !== undefined) {
            if (autoRound?: any) {
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

    resize(width?: any, height?: any) {
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