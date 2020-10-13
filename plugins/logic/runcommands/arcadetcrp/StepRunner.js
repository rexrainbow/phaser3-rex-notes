import GetSceneObject from '../../../utils/system/GetSceneObject.js';
import GetEventEmitter from '../../../utils/system/GetEventEmitter.js';
import RunCommands from '../../../runcommands.js';

class StepRunner {
    constructor(parent) {
        this.parent = parent;
        this.scene = GetSceneObject(parent);

        this.commands = [];

        this.boot();
    }

    boot() {
        var parentEE = GetEventEmitter(this.parent);
        if (parentEE) {
            parentEE.on('destroy', this.destroy, this);
        }

        this.scene.physics.world.on('worldstep', this.update, this);
        //  'worldstep' event is emitted *after* the bodies and colliders have been updated.
    }

    shutdown() {
        this.scene.physics.world.off('worldstep', this.update, this);

        this.parent = undefined;
        this.scene = undefined;
        this.commands = undefined;
    }

    destroy() {
        this.shutdown();
    }

    add(commands, scope) {
        this.commands.push([
            commands, scope
        ]);
        return this;
    }

    update() {
        if (this.commands.length === 0) {
            return;
        }

        var command;
        for (var i = 0, cnt = this.commands.length; i < cnt; i++) {
            command = this.commands[i];
            RunCommands(command[0], command[1]);
        }
        this.commands.length = 0;
    }
}

export default StepRunner;