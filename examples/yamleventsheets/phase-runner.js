import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import { PhaseRunner } from '../../plugins/yamleventsheets.js';
import AliceBehaviorEventSheet from 'raw-loader!/assets/yamleventsheets/phase-runner/alice-behavior.yml';
import WorkTaskEventSheet from 'raw-loader!/assets/yamleventsheets/phase-runner/work-task.yml';
import SleepTaskEventSheet from 'raw-loader!/assets/yamleventsheets/phase-runner/sleep-task.yml';

const TASK_PHASES = ['start', 'tick', 'complete', 'interrupt', 'cancel'];

function compareValues(a, operator, b) {
    switch (operator) {
        case '<': return a < b;
        case '<=': return a <= b;
        case '>': return a > b;
        case '>=': return a >= b;
        case '==': return a == b;
        case '===': return a === b;
        case '!=': return a != b;
        case '!==': return a !== b;
        default: throw new Error(`Unsupported compare operator '${operator}'`);
    }
}

function createPhaseFlags() {
    var flags = {};
    for (var i = 0, cnt = TASK_PHASES.length; i < cnt; i++) {
        flags[TASK_PHASES[i]] = false;
    }
    return flags;
}

class ActiveTask {
    constructor(config) {
        this.id = config.id;
        this.name = config.name || config.taskTitle || config.id;
        this.taskTitle = config.taskTitle;
        this.characterId = config.characterId;
        this.locationId = config.locationId;
        this.durationTicks = config.durationTicks || config.remainingTicks || 1;
        this.remainingTicks = config.remainingTicks || this.durationTicks;
        this.status = config.status || 'running';
        this.tags = config.tags || [];
        this.properties = {
            ...(config.properties || {}),
            $charId: this.characterId,
            $taskId: this.id,
            $taskTitle: this.taskTitle
        };
        this.phaseFlags = createPhaseFlags();
        this.markStarted();
    }

    isRunning() {
        return this.status === 'running';
    }

    setPhaseFlag(phase, value = true) {
        this.phaseFlags[phase] = value;
        return this;
    }

    clearPhaseFlags() {
        this.phaseFlags = createPhaseFlags();
        return this;
    }

    hasPhaseFlag(phase) {
        return this.phaseFlags[phase] === true;
    }

    markStarted() {
        this.status = 'running';
        return this.setPhaseFlag('start');
    }

    markTick(ticks = 1) {
        if (!this.isRunning()) {
            return this.remainingTicks;
        }

        this.setPhaseFlag('tick');
        this.remainingTicks = Math.max(0, this.remainingTicks - ticks);
        if (this.remainingTicks === 0) {
            this.markCompleted();
        }

        return this.remainingTicks;
    }

    markCompleted() {
        this.remainingTicks = 0;
        this.status = 'completed';
        return this.setPhaseFlag('complete');
    }

    dump() {
        return {
            id: this.id,
            taskTitle: this.taskTitle,
            characterId: this.characterId,
            locationId: this.locationId,
            status: this.status,
            remainingTicks: this.remainingTicks,
            phaseFlags: { ...this.phaseFlags }
        };
    }
}

class World {
    constructor() {
        this.tick = 0;
        this.characters = new Map();
        this.locations = new Map();
        this.activeTasks = new Map();
    }

    get currentTick() {
        return this.tick;
    }

    addLocation(config) {
        this.locations.set(config.id, { ...config });
        return this;
    }

    addCharacter(config) {
        this.characters.set(config.id, {
            id: config.id,
            name: config.name || config.id,
            locationId: config.locationId,
            status: { ...(config.status || {}) },
            currentTaskId: config.currentTaskId
        });
        return this;
    }

    getCharacter(characterId) {
        var character = this.characters.get(characterId);
        if (!character) {
            throw new Error(`Character '${characterId}' not found`);
        }
        return character;
    }

    getActiveTaskForCharacter(characterId) {
        var character = this.getCharacter(characterId);
        return character.currentTaskId ? this.activeTasks.get(character.currentTaskId) : undefined;
    }

    isCharacterBusy(characterId) {
        return this.getActiveTaskForCharacter(characterId)?.isRunning() === true;
    }

    createActiveTaskId(taskTitle, characterId) {
        var baseId = `${characterId}:${taskTitle}:${this.tick}`;
        var id = baseId;
        var suffix = 2;
        while (this.activeTasks.has(id)) {
            id = `${baseId}:${suffix}`;
            suffix += 1;
        }
        return id;
    }

    startTask(config) {
        var character = this.getCharacter(config.characterId);
        if (this.isCharacterBusy(config.characterId)) {
            throw new Error(`Character '${config.characterId}' is already busy`);
        }

        var task = new ActiveTask({
            ...config,
            id: config.id || this.createActiveTaskId(config.taskTitle, config.characterId)
        });
        this.activeTasks.set(task.id, task);
        character.currentTaskId = task.id;
        return task;
    }

    modifyCharacterStatus(characterId, field, delta) {
        var character = this.getCharacter(characterId);
        character.status[field] = (character.status[field] || 0) + delta;
        return character.status[field];
    }

    tickTasks(ticks = 1) {
        this.activeTasks.forEach(function (task) {
            task.markTick(ticks);
        });
        this.activeTasks.forEach((task) => {
            if (task.status === 'completed') {
                this.getCharacter(task.characterId).currentTaskId = undefined;
            }
        });
        return this;
    }

    clearAllTaskPhaseFlags() {
        this.activeTasks.forEach(function (task) {
            task.clearPhaseFlags();
        });
        return this;
    }

    removeEndedTasks() {
        this.activeTasks.forEach((task, taskId) => {
            if (!task.isRunning()) {
                var character = this.getCharacter(task.characterId);
                if (character.currentTaskId === task.id) {
                    character.currentTaskId = undefined;
                }
                this.activeTasks.delete(taskId);
            }
        });
        return this;
    }

    advanceTime(ticks = 1) {
        this.tick += ticks;
        return this;
    }

    listActiveTasks() {
        return [...this.activeTasks.values()];
    }

    dump() {
        return {
            tick: this.tick,
            characters: Object.fromEntries(this.characters),
            activeTasks: Object.fromEntries([...this.activeTasks].map(function ([id, task]) {
                return [id, task.dump()];
            }))
        };
    }

    getEvalContext() {
        var world = this;
        return {
            get world() {
                return world.dump();
            }
        };
    }
}

class CommandExecutor {
    constructor(world) {
        this.world = world;
    }

    getEvalContext() {
        return this.world.getEvalContext();
    }

    canStartTask({ characterId, taskTitle } = {}, eventSheetManager) {
        return eventSheetManager.evalCondition(taskTitle, 'tasks', {
            $charId: characterId,
            $taskTitle: taskTitle
        });
    }

    notBusy({ characterId } = {}) {
        return !this.world.isCharacterBusy(characterId);
    }

    characterStatus(parameters = {}) {
        // For expression-parser, return number value
        if (Array.isArray(parameters)) {
            var [characterId, field] = parameters;
            return this.world.getCharacter(characterId).status[field] || 0;
        }

        // For parameter-expression, return boolean
        var { characterId, field, operator = '>=', value } = parameters;
        return compareValues(
            this.world.getCharacter(characterId).status[field] || 0,
            operator,
            value
        );
    }

    taskPhase({ activeTaskId, phase } = {}) {
        return this.world.activeTasks.get(activeTaskId)?.hasPhaseFlag(phase) === true;
    }

    startTask({ characterId, taskTitle, activeTaskId, id } = {}, eventSheetManager) {
        var taskProperties = eventSheetManager.getTree(taskTitle, 'tasks')?.properties || {};
        this.world.startTask({
            id: activeTaskId || id,
            characterId,
            taskTitle,
            name: taskProperties.name || taskTitle,
            locationId: taskProperties.locationId,
            durationTicks: taskProperties.durationTicks,
            tags: taskProperties.tags
        });
        return this;
    }

    modifyCharacterStatus({ characterId, field, value = 0 } = {}) {
        this.world.modifyCharacterStatus(characterId, field, value);
        return this;
    }

    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
        this.wait({ duration: 1000 }, eventSheetManager, eventSheet);
        // Task will be running until 'complete' event fired
    }

    wait({ duration = 1000 } = {}, eventSheetManager, eventSheet) {
        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
        return this;
    }

    defaultHandler(name) {
        throw new Error(`Unknown CharacterLife event sheet handler '${name}'`);
    }
}

function createWorld() {
    var world = new World();

    world
        .addLocation({
            id: 'office',
            name: 'Office',
            tags: ['workplace'],
            state: { isOpen: true }
        })
        .addLocation({
            id: 'home',
            name: 'Home',
            tags: ['Home'],
            state: { isOpen: true }
        })
        .addCharacter({
            id: 'alice',
            name: 'Alice',
            locationId: 'office',
            status: { money: 0, energy: 30, stress: 0, skill: 1 }
        });

    return world;
}

function logCharacterState(world, label) {
    var alice = world.getCharacter('alice');
    var task = world.listActiveTasks()[0];
    console.log(label, {
        tick: world.tick,
        alice: {
            locationId: alice.locationId,
            currentTaskId: alice.currentTaskId,
            status: { ...alice.status }
        },
        activeTask: task ? task.dump() : undefined
    });
}

var world = createWorld();
var commandExecutor = new CommandExecutor(world);
var eventSheetManager = new YAMLEventSheets({
    commandExecutor,
    globalMemory: commandExecutor.getEvalContext()
});

eventSheetManager
    .addEventSheet(AliceBehaviorEventSheet, 'characters')
    .addEventSheet(WorkTaskEventSheet, 'tasks')
    .addEventSheet(SleepTaskEventSheet, 'tasks');

var taskPhase = {
    name: 'tasks',

    enter: function (runner, eventSheetManager, nextPhaseCallback) {
        this.tasks = world.listActiveTasks();
        this.taskIndex = 0;
        this.nextPhaseCallback = nextPhaseCallback;
        this.runNextTask(runner, eventSheetManager);
    },

    exit: function (runner, eventSheetManager) {
        this.clearCompleteHandler(eventSheetManager);
        this.tasks = undefined;
        this.taskIndex = 0;
        this.nextPhaseCallback = undefined;
    },

    clearCompleteHandler: function (eventSheetManager) {
        if (this.completeHandler) {
            eventSheetManager.off('complete', this.completeHandler);
            this.completeHandler = undefined;
        }
    },

    runNextTask: function (runner, eventSheetManager) {
        if (!runner.isRunning) {
            return;
        }

        if (this.taskIndex >= this.tasks.length) {
            this.nextPhaseCallback();
            return;
        }

        var task = this.tasks[this.taskIndex++];
        this.completeHandler = (completedGroupName) => {
            if (completedGroupName !== 'tasks') {
                return;
            }

            this.clearCompleteHandler(eventSheetManager);
            this.runNextTask(runner, eventSheetManager);
        }

        eventSheetManager.on('complete', this.completeHandler);
        eventSheetManager.start(task.taskTitle, 'tasks', true, task.properties);
    }
}

var phaseRunner = new PhaseRunner(eventSheetManager, {
    phases: [
        {
            name: 'characters',
            groupName: 'characters'
        },
        {
            name: 'tickTasks',
            enter: function (runner, eventSheetManager, nextPhaseCallback) {
                world.tickTasks();
                nextPhaseCallback();
            }
        },
        taskPhase,
        {
            name: 'cleanup',
            enter: function (runner, eventSheetManager, nextPhaseCallback) {
                logCharacterState(world, 'After run task, before remove ended tasks');

                world.clearAllTaskPhaseFlags();
                world.removeEndedTasks();
                world.advanceTime();

                nextPhaseCallback();
            }
        }
    ]
});

async function runRound() {
    console.log(`---- Round ${world.tick} ----`);
    eventSheetManager.setRoundCounter(world.tick);
    await phaseRunner.startPromise();
}

async function runRounds(count = 12) {
    if (count <= 0) {
        return;
    }

    for (var i = 0; i < count; i++) {
        await runRound();
    }
}

Object.assign(window, {
    characterAndTaskDemo: {
        commandExecutor,
        eventSheetManager,
        phaseRunner,
        runRound,
        runRounds,
        world
    }
});

runRounds().catch(function (error) {
    console.error(error);
});
