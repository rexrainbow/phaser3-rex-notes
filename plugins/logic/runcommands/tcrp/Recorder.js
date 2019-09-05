import Clock from '../../../clock.js';
import Clone from '../../../utils/object/Clone.js';
import GetEventEmitter from '../../../utils/system/GetEventEmitter.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Recorder {
    constructor(parent, config) {
        this.parent = parent;
        this.scene = GetSceneObject(parent);
        this.clock = new Clock(parent);
        this.resetFromJSON(config); // this function had been called in super(config)
        this.boot();
    }

    resetFromJSON(o) {
        var clockConfig = GetValue(o, 'clock', undefined);
        this.clock.resetFromJSON(clockConfig);
        this.commands = GetValue(o, 'commands', []); // [[dt, cmd], [dt, cmd], ...]
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
            parentEE.once('destroy', this.destroy, this);
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
        var dt = this.clock.now + offset;
        this.commands.push([dt, command]);
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