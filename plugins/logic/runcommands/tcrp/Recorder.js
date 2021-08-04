import ComponentBase from '../../../utils/componentbase/ComponentBase.js';
import Clock from '../../../clock.js';
import Clone from '../../../utils/object/Clone.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Recorder extends ComponentBase {
    constructor(parent, config) {
        super(parent, { eventEmitter: false });
        // No event emitter

        var clockClass = GetValue(config, 'clockClass', Clock);
        this.clock = new clockClass(parent);

        this.resetFromJSON(config); // This function had been called in super(config)
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

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.commands = undefined;
        this.clock.shutdown(fromScene);

        super.shutdown(fromScene);
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

    setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
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
        return this;
    }
}

export default Recorder;