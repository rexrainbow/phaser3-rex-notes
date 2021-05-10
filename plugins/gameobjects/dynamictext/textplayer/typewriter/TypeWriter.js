import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods.js';
import Methods from './Methods.js';
import Timeline from '../../../../time/progresses/Timeline.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TypeWriter {
    constructor(dynamicText, config) {
        this.setEventEmitter();
        this.dynamicText = dynamicText;
        this.timeline = new Timeline(dynamicText);

        this.onTypeStart = GetValue(config, 'onTypeStart', SetChildrenInvisible);
        this.setSpeed(GetValue(config, 'speed', 250));
        this.setAnimationConfig(GetValue(config, 'animation', undefined));
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setAnimationConfig(config) {
        if (config === undefined) {
            config = {};
        } else if (config === false) {
            config = {
                duration: 0
            }
        }
        if (!config.hasOwnProperty('duration')) {
            // Apply default duration
            config.duration = 1000;
        }
        if (!config.hasOwnProperty('onStart')) {
            // Apply default onStart callback
            config.onStart = SetChildVisible;
        }
        this.animationConfig = config;
        return this;
    }

    getNextChild() {
        var child = this.children[this.index];
        this.index++; // Point to next child
        return child;
    }
}

var SetChildVisible = function (child) {
    child.setVisible();
}

var SetChildrenInvisible = function (children) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        children[i].setVisible(false);
    }
}

Object.assign(
    TypeWriter.prototype,
    EventEmitterMethods,
    Methods,
);

export default TypeWriter;