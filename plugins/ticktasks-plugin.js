'use strict'

import TasksManager from './behaviors/ticktask/TaskManager.js';

class TasksManagerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    init() {
        this.manager = new TasksManager(this.game);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);

        this.manager.boot();
    }

    destroy() {
        this.manager.destroy();

        this.pluginManager = null;
        this.game = null;
        this.scene = null;
        this.systems = null;
    }

    add(target, config) {
        this.manager.add(target, config);
        return this;
    }

}

export default TasksManagerPlugin;