import ComponentBase from '../../../utils/componentbase/ComponentBase';
import Clock from '../../../clock';
import Clone from '../../../utils/object/Clone';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Recorder extends ComponentBase {
    emit: any;
    isShutdown: any;
    parent: any;

    constructor(parent?: any, config?: any) {
        super(parent, config);

        var clock = GetValue(config, 'clock', undefined);
        if (!clock) {
            clock = new Clock(parent);
        }
        this.clock = clock;

        this.resetFromJSON(config); // This function had been called in super(config)
    }

    resetFromJSON(o?: any) {
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

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.commands = undefined;
        this.clock.shutdown(fromScene);

        super.shutdown(fromScene);
    }

    start(startAt?: any) {
        this.clear();
        this.clock.start(startAt);
        this.emit('start', this.parent, this);
        return this;
    }

    pause() {
        this.clock.pause();
        this.emit('pause', this.parent, this);
        return this;
    }

    resume() {
        this.clock.resume();
        this.emit('resume', this.parent, this);
        return this;
    }

    stop() {
        this.clock.stop();
        this.emit('stop', this.parent, this);
        return this;
    }

    seek(time?: any) {
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

    setTimeScale(timeScale?: any) {
        this.timeScale = timeScale;
        return this;
    }

    get now() {
        return this.clock.now;
    }

    addCommand(command?: any, offset?: any) {
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

    getCommands(isRef?: any) {
        if (isRef === undefined) {
            isRef = false;
        }
        var commands;
        if (isRef?: any) {
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