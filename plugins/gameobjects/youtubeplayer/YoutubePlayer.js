import LoadAPI from './LoadAPI.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;


// TODO: Use DOMElement directly in next phaser version
const BaseClass = (DOMElement) ? DOMElement : Object;
class YoutubePlayer extends BaseClass {
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
        var autoRound = scene.scale.autoRound;
        if (width !== undefined) {
            if (autoRound) {
                width = Math.floor(width);
            }
            config.width = width + 'px';
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height + 'px';
        }

        super(scene, x, y);
        this.type = 'rexYoutubePlayer';
        this.youtubePlayer = undefined;
        this.videoId = GetValue(config, 'videoId', '');

        // Create DIV element and add it
        var elementId = 'YT' + Date.now();
        var element = document.createElement('div');
        element.id = elementId;
        element.style.width = config.width;
        element.style.height = config.height;
        this.setElement(element);

        // Create youtube player iframe when API ready
        var playerVars = {
            autoplay: GetValue(config, 'autoPlay', true),
            controls: GetValue(config, 'controls', true),
            showinfo: GetValue(config, 'showInfo', true),
            disablekb: !GetValue(config, 'keyboardControl', true),
            modestbranding: GetValue(config, 'ModestBranding', false),
        };
        var onLoad = (function () {
            this.youtubePlayer = new YT.Player(
                elementId,
                {
                    'videoId': this.videoId,
                    'playerVars': playerVars,
                    'events': {
                        'onStateChange': (function () { this.emit('statechange'); }).bind(this),
                        'onReady': (function () { this.emit('ready'); }).bind(this),
                        'onError': (function () { this.emit('error'); }).bind(this),
                    }
                }
            );
            this.setElement(document.getElementById(elementId)); // Also remove previous DIV element
        }).bind(this);
        LoadAPI(onLoad);
    }

    play() {
        this.youtubePlayer.playVideo();
        return this;
    }
}

export default YoutubePlayer;