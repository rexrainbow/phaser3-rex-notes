import GetSceneObject from '../../../utils/system/GetSceneObject.js';
import Clock from '../../../clock.js';
import Clone from '../../../utils/object/Clone.js';
import GetEventEmitter from '../../../utils/system/GetEventEmitter.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Recorder {
    constructor(parent, config) {
        this.parent = parent;
        this.scene = GetSceneObject(parent);

        var clockClass = GetValue(config, 'clockClass', Clock);
        this.clock = new clockClass(parent);

        this.resetFromJSON(config); // This function had been called in super(config)
        this.boot();
    }

    resetFromJSON(o) {
        this.clock.resetFromJSON(GetValue(o, 'clock', undefined));
        this.commands = GetValue(o, 'commands', []); // [[time, cmd], [time, cmd], ...]
        return this;
    }

    toJSON() {
        return {
            clock: this.clock.toJSON(),
            commands: this.commands
        };
    }

    boot() {
        var parentEE = GetEventEmitter(this.parent);
        if (parentEE) {
            parentEE.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.clock.shutdown();
        this.parent = undefined;
        this.scene = undefined;
        this.commands = undefined;
    }

    destroy() {
        this.shutdown();
    }

    start(startAt) {
        this.clock.start(startAt);
        this.clear();
        return this;
    }

    pause() {
        this.clock.pause();
        return this;
    }

    resume() {
        this.clock.resume();
        return this;
    }

    stop() {
        this.clock.stop();
        return this;
    }

    seek(time) {
        this.clock.seek(time);
        return this;
    }

    get isRecording() {
        return this.clock.isRunning;
    }

    get timeScale() {
        return this.clock.timeScale;
    }

    set timeScale(timeScale) {
        this.clock.timeScale = timeScale;
    }

    get now() {
        return this.clock.now;
    }

    addCommand(command, offset) {
        if (!this.isRecording) {
            return this;
        }
        if (offset === undefined) {
            offset = 0;
        }
        var time = this.clock.now + offset;
        this.commands.push([time, command]);
        return this;
    }

    getCommands(isRef) {
        if (isRef === undefined) {
            isRef = false;
        }
        var commands;
        if (isRef) {
            commands = this.commands;
        } else {
            commands = Clone(this.commands);
        }
        return commands;
    }

    clear() {
        this.commands.length = 0;
    }
}

export default Recorder;