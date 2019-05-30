import GetSrc from './GetSrc.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

// TODO: Use DOMElement directly in next phaser version
const BaseClass = (DOMElement) ? DOMElement : Object;
class Video extends BaseClass {
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
            config.width = width;
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height;
        }

        var element = document.createElement('video');

        // Apply registed properties
        var elemProp, elemPropValue;
        for (var key in ElementProperties) {
            elemProp = ElementProperties[key];
            elemPropValue = GetValue(config, key, elemProp[1]);
            if (elemPropValue !== undefined) {
                element[elemProp[0]] = elemPropValue;
            }
        }

        super(scene, x, y, element);
        this.type = 'rexVideo';

        this.setSource(GetValue(config, 'src', ''));

        // Apply events
        for (var eventName in ElementEvents) {
            this.node.addEventListener(ElementEvents[eventName], (function () {
                this.emit(eventName, this);
            }).bind(this));
        }
    }

    get availableVideoTypes() {
        return this.scene.sys.game.device.video;
    }

    setSource(src) {
        src = GetSrc(src, this.availableVideoTypes);
        if (src !== '') {
            this.node.src = GetSrc(src, this.availableVideoTypes);
            this.node.load();
        }
        return this;
    }

    play() {
        this.node.play();
        return this;
    }

    pause() {
        this.node.pause();
        return this;
    }

    isPaused() {
        return this.node.paused;
    }

    get playbackTime() {
        return this.node.currentTime || 0;
    }

    set playbackTime(value) {
        try {
            this.node.currentTime = value;
        }
        catch (e) {
        }
    }

    setPlaybackTime(time) {
        this.playbackTime = time;
        return this;
    }

    get duration() {
        return this.node.duration || 0;
    }

    get volume() {
        return this.node.volume || 0;
    }

    set volume(value) {
        this.node.volume = value;
    }

    setVolume(value) {
        this.volume = value;
        return this;
    }

    get mute() {
        return this.node.muted || false;
    }

    set mute(value) {
        this.node.muted = value;
    }

    setMute(value) {
        if (value === undefined) {
            value = true;
        }
        this.mute = value;
        return this;
    }

    get loop() {
        return this.node.loop;
    }

    set loop(value) {
        this.node.loop = value;
    }

    setLoop(value) {
        if (value === undefined) {
            value = true;
        }
        this.mute = value;
        return this;
    }
}

const ElementProperties = {
    id: ['id', undefined],
    width: ['width', undefined],
    height: ['height', undefined],
    autoPlay: ['autoplay', true],
    controls: ['controls', false],

};

const ElementEvents = {
    canplay: 'canplay',
    canplaythrough: 'canplaythrough',
    ended: 'ended',
    error: 'error',
    loadstart: 'loadstart',
    playing: 'playing',
    pause: 'pause',
    stalled: 'stalled',
}

export default Video;