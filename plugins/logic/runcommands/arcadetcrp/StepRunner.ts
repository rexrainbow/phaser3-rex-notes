import ComponentBase from '../../../utils/componentbase/ComponentBase';
import RunCommands from '../../../runcommands';

class StepRunner extends ComponentBase {
    commands: any;
    isShutdown: any;
    parent: any;
    scene: any;

    constructor(parent?: any) {
        super(parent, { eventEmitter: false });
        // this.parent = gameObject;

        this.commands = [];
        this.boot();
    }

    boot() {
        this.scene.physics.world.on('worldstep', this.update, this);
        //  'worldstep' event is emitted *after* the bodies and colliders have been updated.
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.scene.physics.world.off('worldstep', this.update, this);
        this.commands = undefined;

        super.shutdown(fromScene)
    }

    add(commands?: any, scope?: any) {
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