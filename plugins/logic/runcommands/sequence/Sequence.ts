import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods';
import GetValue from '../../../utils/object/GetValue';
import RunCommands from '../../../runcommands';
import ArrayCopy from '../../../utils/array/Copy';

const STATE_IDLE = 0;
const STATE_RUN = 1;
const STATE_RUNLAST = 2;
const STATE_COMPLETE = 3;

class Sequence {
    loop: any;
    task: any;
    yoyo: any;

    commands: any;
    config: any;
    destroyEventEmitter: any;
    emit: any;
    index: any;
    indexStep: any;
    repeat: any;
    repeatCount: any;
    scope: any;
    setEventEmitter: any;
    state: any;

    constructor(config?: any) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.commands = [];
        this.scope = undefined;
        this.config = undefined;
        this.index = 0;
        this.indexStep = 1; // 1, or -1
        this.setYoyo(GetValue(config, 'yoyo', false));
        this.setRepeat(GetValue(config, 'repeat', 0));
        this.setLoop(GetValue(config, 'loop', false));
        this.state = STATE_IDLE;
        this.task = undefined;
    }

    shutdown() {
        this.stop();
        this.destroyEventEmitter();
        this.commands.length = 0;
        this.scope = undefined;
        this.config = undefined;
    }

    destroy() {
        this.shutdown();
    }

    load(commands?: any, scope?: any, config?: any) {
        this.stop();
        this.setYoyo(GetValue(config, 'yoyo', this.yoyo));
        this.setRepeat(GetValue(config, 'repeat', this.repeat));
        this.setLoop(GetValue(config, 'loop', this.loop));

        this.commands = ArrayCopy(this.commands, commands);
        this.scope = scope;
        this.config = config;
        return this;
    }

    start() {
        this.stop();

        this.resetRepeatCount();
        this.index = 0;
        this.indexStep = 1;
        this.state = STATE_RUN;
        if (this.commands.length > 0) {
            this.runNextCommands();
        } else {
            this.complete();
        }
        return this;
    }

    stop() {
        if (this.task) {
            this.task.off('complete', this.runNextCommands, this);
            this.task = undefined;
        }
        this.state = STATE_IDLE;
        return this;
    }

    setYoyo(yoyo?: any) {
        if (yoyo === undefined) {
            yoyo = true;
        }
        this.yoyo = yoyo;
        return this;
    }

    setRepeat(count?: any) {
        this.repeat = count;
        this.resetRepeatCount();
        return this;
    }

    setLoop(loop?: any) {
        if (loop === undefined) {
            loop = true;
        }
        this.loop = loop;
        this.resetRepeatCount();
        return this;
    }

    resetRepeatCount() {
        this.repeatCount = (this.repeat === -1 || this.loop) ? 999999999999 : this.repeat;
        return this;
    }

    get completed() {
        return (this.state === STATE_COMPLETE);
    }

    get currentCommandIndex() {
        return (this.index - 1);
    }

    runNextCommands() {
        var task, isFirstCommand, isLastCommand;
        while (1) {
            if (this.state === STATE_RUNLAST) {
                this.complete();
                return;
            }

            task = RunCommands(this.commands[this.index], this.scope);
            if (task && (typeof (task.once) === 'function')) {
                task.once('complete', this.runNextCommands, this);
                this.task = task;
            } else {
                this.task = undefined;
            }

            isFirstCommand = (this.index === 0);
            isLastCommand = (this.index === (this.commands.length - 1));
            if (!this.yoyo) {
                if (isLastCommand?: any) {
                    this.index = 0;
                    if (this.repeatCount > 0) {
                        this.repeatCount--;
                    } else {
                        this.state = STATE_RUNLAST; // goto completed at next running
                    }
                } else {
                    this.index += this.indexStep;
                }
            } else {
                if (((this.indexStep > 0) && isLastCommand) ||
                    ((this.indexStep < 0) && isFirstCommand)) {
                    this.indexStep = -this.indexStep;
                    this.index += this.indexStep;
                    if (this.repeatCount > 0) {
                        this.repeatCount--;
                    } else {
                        this.state = STATE_RUNLAST; // goto completed at next running
                    }
                } else {
                    this.index += this.indexStep;
                }
            }

            if (this.task) {
                return this;
            }
        }
    }

    complete() {
        this.state = STATE_COMPLETE;
        this.emit('complete', this.scope, this);
    }
}

Object.assign(
    Sequence.prototype,
    EventEmitterMethods
);

export default Sequence;