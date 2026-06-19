import StateManager from '../../statemanager/StateManagerBase.js';

const IDLE_STATE = '$idle';

class PhaseRunner extends StateManager {
    constructor(eventSheetManager, config) {
        var phases = config.phases;
        super({});

        this.eventSheetManager = eventSheetManager;

        var stateManager = this;
        var nextPhaseCallback = function () {
            if (!stateManager.isRunning) {
                return;
            }
            stateManager.next();
        }

        for (var i = 0, cnt = phases.length; i < cnt; i++) {
            let phase = phases[i];
            if (!phase.name) {
                phase.name = i.toString();
            }

            if (!phase.enter && phase.groupName) {
                // Run group until complete event firing of this group
                let groupName = phase.groupName;
                let groupcompleteHandler = function (completedGroupName) {
                    if (groupName !== completedGroupName) {
                        return;
                    }
                    nextPhaseCallback();
                }

                phase.enter = function () {
                    eventSheetManager.on('complete', groupcompleteHandler);
                    eventSheetManager.startGroup(groupName);
                }

                phase.exit = function () {
                    eventSheetManager.off('complete', groupcompleteHandler);
                }
            } else {
                // Custom phase lifecycle
                if (!phase.enter) {
                    throw new Error(`Phase '${phase.name}' requires an enter callback or groupName`);
                }

                let enterCallback = phase.enter;
                let exitCallback = phase.exit;

                phase.enter = function () {
                    enterCallback.call(phase, stateManager, eventSheetManager, nextPhaseCallback);
                }

                if (exitCallback) {
                    phase.exit = function () {
                        exitCallback.call(phase, stateManager, eventSheetManager);
                    }
                }
            }
        }

        for (var i = 0, cnt = phases.length; i < cnt; i++) {
            let phase = phases[i];

            var nextPhase;
            if (phase.next) {
                nextPhase = phase.next;
            } else if (i < cnt - 1) {
                nextPhase = phases[i + 1].name;
            } else {
                nextPhase = IDLE_STATE;
            }
            this.addState({
                name: phase.name,
                next: nextPhase,
                enter: phase.enter,
                exit: phase.exit
            })
        }

        this.addState({
            name: IDLE_STATE,
            enter: function () {
                if (stateManager._cancelRunning) {
                    stateManager.emit('cancel');
                } else {
                    stateManager.emit('complete');
                }
                stateManager._cancelRunning = false;
            }
        })

        this._cancelRunning = false;
        this._firstPhaseName = phases[0].name;
        super.start(IDLE_STATE);
    }

    get isRunning() {
        return this.state !== IDLE_STATE;
    }

    start() {
        if (this.isRunning) {
            return this;
        }

        super.goto(this._firstPhaseName);
        return this;
    }

    startPromise() {
        if (this.isRunning) {
            return Promise.reject(new Error('PhaseRunner is already running'));
        }

        var stateManager = this;
        return new Promise(function (resolve, reject) {
            var completeHandler;
            var cancelHandler;

            var cleanup = function () {
                stateManager.off('complete', completeHandler);
                stateManager.off('cancel', cancelHandler);
            }

            completeHandler = function () {
                cleanup();
                resolve(stateManager);
            }

            cancelHandler = function () {
                cleanup();
                reject(new Error('PhaseRunner was canceled'));
            }

            stateManager.once('complete', completeHandler);
            stateManager.once('cancel', cancelHandler);

            try {
                stateManager.start();
            } catch (error) {
                cleanup();
                reject(error);
            }
        });
    }

    stop() {
        if (!this.isRunning) {
            return this;
        }

        this._cancelRunning = true;
        this.goto(IDLE_STATE);

        return this;
    }

}

export default PhaseRunner;
