import { MODE_PARALLEL, MODE_SEQUENCE } from '../constants.js';
import AwaitCallback from '../utils/AwaitCallback.js';
import StartEventSheet from '../utils/StartEventSheet.js';

var RunMethods = {
    setMode(mode) {
        this.mode = mode;
        return this;
    },

    start() {
        if (this.isRunning) {
            return this;
        }

        this.startPromise().catch(function () {
        });
        return this;
    },

    async startPromise() {
        if (this.isRunning) {
            return Promise.reject(new Error('ActorStateMachineRunner is already running'));
        }

        this.isRunning = true;
        this.isStopping = false;
        this.emit('start', this);

        try {
            await this.runRound();

            this.throwIfStopping();

            this.emit('complete', this);
            return this;
        } catch (error) {
            if (this.isStopping) {
                this.emit('cancel', this);
            } else {
                this.emit('error', error, this);
            }
            throw error;
        } finally {
            this.currentRun = null;
            this.currentStateAction = null;
            this.isStopping = false;
            this.isRunning = false;
        }
    },

    async runRound() {
        switch (this.mode) {
            case MODE_PARALLEL:
                await this.runParallel();
                break;

            case MODE_SEQUENCE:
                await this.runSequence();
                break;

            default:
                throw new Error(`Unknown actor state machine run mode '${this.mode}'`);
        }

        this.throwIfStopping();

        this.emit('cleanup.start', this);
        this.cleanupStateActions();
        this.emit('cleanup', this);
        await AwaitCallback(this.cleanupCallback, this);
        this.emit('cleanup.complete', this);
    },

    async runActorStateTransition(actor) {
        this.throwIfStopping();

        this.emit('stateTransition.start', actor, this);
        this.throwIfStopping();

        var run = StartEventSheet(
            this.eventSheetManager,
            actor.transitionTitle,
            this.transitionGroupName,
            true, // ignoreCondition
            actor.properties
        );
        await this.waitEventSheetRun(run);
        this.throwIfStopping();

        this.emit('stateTransition.complete', actor, this);
    },

    async runActorStateAction(actor, stateAction, options = {}) {
        this.throwIfStopping();

        this.currentStateAction = stateAction;
        try {
            var tick = options.tick !== false;
            if (tick) {
                this.emit('stateTick.start', actor, stateAction, this);
                this.throwIfStopping();

                await AwaitCallback(function () {
                    return stateAction.markTick();
                });
                this.emit('stateTick.complete', actor, stateAction, this);
            }

            this.throwIfStopping();

            this.emit('stateAction.start', actor, stateAction, options, this);
            this.throwIfStopping();

            var run = StartEventSheet(
                this.eventSheetManager,
                stateAction.stateActionTitle,
                this.stateActionGroupName,
                true, // ignoreCondition
                stateAction.properties
            );
            await this.waitEventSheetRun(run);
            this.throwIfStopping();

            this.emit('stateAction.complete', actor, stateAction, options, this);
        } catch (error) {
            if (this.isStopping) {
                stateAction.markCancelled();
            }
            throw error;
        } finally {
            if (this.currentStateAction === stateAction) {
                this.currentStateAction = null;
            }
        }
    },

    async waitEventSheetRun(run) {
        if (!run) {
            return;
        }

        this.currentRun = run;
        try {
            await run.promise;
        } finally {
            if (this.currentRun === run) {
                this.currentRun = null;
            }
        }
    },
}

export default RunMethods;
