import YAMLEventSheets from '../../plugins/yamleventsheets.js';
import { Actors } from '../../plugins/yamleventsheets.js';
import ParseYaml from '../../plugins/utils/yaml/ParseYaml.js';
import ActorsConfig from 'raw-loader!/assets/yamleventsheets/actors/actors.yml';
import AliceBehaviorEventSheet from 'raw-loader!/assets/yamleventsheets/actors/alice-behavior.yml';
import WorkTaskEventSheet from 'raw-loader!/assets/yamleventsheets/actors/work-task.yml';
import SleepTaskEventSheet from 'raw-loader!/assets/yamleventsheets/actors/sleep-task.yml';

/*
```mermaid
graph TD

YAMLEventSheets --> CommandExecutor
CommandExecutor --> World
CommandExecutor --> Actors
Actors --> YAMLEventSheets
```
*/

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

class World {
    constructor() {
        this.tick = 0;
        this.characters = new Map();
    }

    get currentTick() {
        return this.tick;
    }

    addCharacter(config) {
        this.characters.set(config.id, {
            id: config.id,
            name: config.name || config.id,
            status: { ...(config.status || {}) }
        });
        return this;
    }

    getCharacter(actorId) {
        var character = this.characters.get(actorId);
        if (!character) {
            throw new Error(`Character '${actorId}' not found`);
        }
        return character;
    }

    modifyCharacterStatus(actorId, field, delta) {
        var character = this.getCharacter(actorId);
        character.status[field] = (character.status[field] || 0) + delta;
        return character.status[field];
    }

    advanceTime(ticks = 1) {
        this.tick += ticks;
        return this;
    }

    dump() {
        return {
            tick: this.tick,
            characters: Object.fromEntries(this.characters)
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
        this.actors = null;
    }

    setWorld(world) {
        this.world = world;
        return this;
    }

    setActors(actors) {
        this.actors = actors;
        return this;
    }

    getEvalContext() {
        return this.world.getEvalContext();
    }

    getActor(actorId) {
        return this.actors.getActor(actorId);
    }

    getStateAction(stateActionId) {
        var actors = this.actors.actors;
        for (var i = 0, cnt = actors.length; i < cnt; i++) {
            var actor = actors[i];
            var previousStateAction = actor.previousStateAction;
            if (previousStateAction && (previousStateAction.id === stateActionId)) {
                return previousStateAction;
            }

            var currentStateAction = actor.currentStateAction;
            if (currentStateAction && (currentStateAction.id === stateActionId)) {
                return currentStateAction;
            }
        }
        return null;
    }

    canStartTask({ actorId, stateActionTitle } = {}, eventSheetManager) {
        return eventSheetManager.evalCondition(stateActionTitle, 'tasks', {
            $actorId: actorId,
            $stateActionTitle: stateActionTitle
        });
    }

    notBusy({ actorId } = {}) {
        return !this.getActor(actorId).isBusy();
    }

    characterStatus(parameters = {}) {
        var actorId, field, operator, value;

        if (Array.isArray(parameters)) {
            [actorId, field] = parameters;
            return this.world.getCharacter(actorId).status[field] || 0;
        }

        ({
            actorId,
            field,
            operator = '>=',
            value
        } = parameters);

        return compareValues(
            this.world.getCharacter(actorId).status[field] || 0,
            operator,
            value
        );
    }

    taskPhase({ stateActionId, phase } = {}) {
        return this.getStateAction(stateActionId)?.hasPhaseFlag(phase) === true;
    }

    startTask({ actorId, stateActionTitle } = {}) {
        this.actors.startStateAction({
            actorId,
            stateActionTitle
        });
        return this;
    }

    modifyCharacterStatus({ actorId, field, value = 0 } = {}) {
        this.world.modifyCharacterStatus(actorId, field, value);
        return this;
    }

    print({ text = '' } = {}, eventSheetManager, eventSheet) {
        console.log(text);
        this.wait({ duration: 1000 }, eventSheetManager, eventSheet);
    }

    wait({ duration = 1000 } = {}, eventSheetManager) {
        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
        return this;
    }

    defaultHandler(name) {
        throw new Error(`Unknown Actors event sheet handler '${name}'`);
    }
}

function addActorsFromYaml(world, actors, yamlString) {
    var data = ParseYaml(yamlString) || {};
    var actorConfigs = data.actors || [];

    for (var i = 0, cnt = actorConfigs.length; i < cnt; i++) {
        var config = actorConfigs[i];
        world.addCharacter(config);
        actors.addActor({
            id: config.id,
            parentId: config.parentId,
            priority: config.priority,
            transitionTitle: config.transitionTitle,
            properties: {
                ...(config.properties || {})
            }
        });
    }

    return actors;
}

function dumpStateAction(stateAction) {
    return stateAction ? stateAction.dump() : undefined;
}

function logCharacterState(world, actors, label) {
    var alice = world.getCharacter('alice');
    var actor = actors.getActor('alice');
    console.log(label, {
        tick: world.tick,
        alice: {
            status: { ...alice.status }
        },
        actor: {
            currentStateAction: dumpStateAction(actor.currentStateAction),
            previousStateAction: dumpStateAction(actor.previousStateAction)
        }
    });
}

var world = new World();
var commandExecutor = new CommandExecutor(world);
var eventSheetManager = new YAMLEventSheets({
    commandExecutor,
    globalMemory: commandExecutor.getEvalContext()
});

var actors = new Actors(eventSheetManager, {
    transitionGroupName: 'characters',
    stateActionGroupName: 'tasks',
    cleanup: function () {
        logCharacterState(world, actors, 'After actors round cleanup');
        world.advanceTime();
    }
});
commandExecutor.setActors(actors);

addActorsFromYaml(world, actors, ActorsConfig);

eventSheetManager
    .addEventSheet(AliceBehaviorEventSheet, 'characters')
    .addEventSheet(WorkTaskEventSheet, 'tasks')
    .addEventSheet(SleepTaskEventSheet, 'tasks');

async function runRound() {
    console.log(`---- Round ${world.tick} ----`);
    eventSheetManager.setRoundCounter(world.tick);
    await actors.startPromise();
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
        actors,
        commandExecutor,
        eventSheetManager,
        runRound,
        runRounds,
        world
    }
});

runRounds().catch(function (error) {
    console.error(error);
});
