import VideoBase from '../videobase/VideoBase';
import Canvas from '../../canvas/canvasbase/Canvas';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class VideoCanvas extends VideoBase(Canvas) {
    height: any;
    width: any;

    canvas: any;
    context: any;
    createVideoElement: any;
    frame: any;
    load: any;
    readyState: any;
    renderer: any;
    type: any;
    video: any;

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

        super(scene, x, y, width, height);
        this.type = 'rexVideoCanvas';

        this.createVideoElement(config);
        this.load(GetValue(config, 'src', ''));
    }

    renderWebGL(renderer?: any, src?: any, camera?: any, parentMatrix?: any) {
        if (this.readyState > 0) {
            this.renderer.canvasToTexture(this.video, this.frame.source.glTexture, true);
            if (typeof WEBGL_DEBUG) {
                this.frame.glTexture.spectorMetadata = { textureKey: 'VideoCanvas Game Object' };
            }
        } else {
            var renderer = this.renderer;
            var gl = renderer.gl;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            renderer.setFramebuffer(null, true);
        }
        super.renderWebGL(renderer, src, camera, parentMatrix);
    }

    renderCanvas(renderer?: any, src?: any, camera?: any, parentMatrix?: any) {
        if (this.readyState > 0) {
            this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        super.renderCanvas(renderer, src, camera, parentMatrix);
    }

    resize(width?: any, height?: any) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        this.video.width = width;
        this.video.height = height;
        super.resize(width, height);
        return this;
    }
}
export default VideoCanvas;