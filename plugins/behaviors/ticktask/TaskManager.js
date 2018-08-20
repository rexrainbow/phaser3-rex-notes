import TaskTypeCache from './TaskTypeCache.js';
import ParallelTasks from './ParallelTasks/ParallelTasks.js';

class TaskManager {
    constructor(game, config) {
        this.game = game;
        this.roots = []; // each target has 1 root task (parallel task)
        this.resetFromJSON(config);
        // this.boot();
    }

    resetFromJSON(o) {
        return this;
    }

    toJSON() {
        return {};
    }

    boot() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
        eventEmitter.on('pause', this.gamePause, this);
        eventEmitter.on('resume', this.gameResume, this);
        eventEmitter.on('prestep', this.preStep, this);
        eventEmitter.on('step', this.step, this);
        eventEmitter.on('poststep', this.postStep, this);
        eventEmitter.on('prerender', this.preRender, this);
        eventEmitter.on('postrender', this.postRender, this);
    }

    shutdown() {
        var eventEmitter = this.game.events;
        eventEmitter.off('destroy', this.destroy, this);
        eventEmitter.off('pause', this.gamePause, this);
        eventEmitter.off('resume', this.gameResume, this);
        eventEmitter.off('prestep', this.preStep, this);
        eventEmitter.off('step', this.step, this);
        eventEmitter.off('poststep', this.postStep, this);
        eventEmitter.off('prerender', this.preRender, this);
        eventEmitter.off('postrender', this.postRender, this);
        this.game = undefined;
    }

    destroy() {
        this.shutdown();
    }

    add(target, config) {
        var rootTask;
        var idx = this.roots.indexOf(target);
        if (idx !== -1) {
            rootTask = this.roots[idx];
            rootTask.add(config);
        } else {
            rootTask = new ParallelTasks(target, null, config);
            this.roots.push(rootTask);
        }
        return this;
    }


    gamePause() {

    }

    gameResume() {

    }

    preStep(time, delta) {
        this.runCallback('prestep', time, delta);
    }

    step(time, delta) {
        this.runCallback('step', time, delta);
    }

    postStep(time, delta) {
        this.runCallback('poststep', time, delta);
    }

    preRender(renderer, time, delta) {
        this.runCallback('prerender', time, delta);
    }

    postRender(renderer, time, delta) {
        this.runCallback('postrender', time, delta);
    }

    runCallback(event, time, delta) {
        if (this.roots.length === 0) {
            return;
        }

        var roots = this.roots,
            task;
        for (var i = 0, len = roots.length; i < len; i++) {
            task = roots[i];
            if (task[event]) {
                task[event](time, delta);
            }
        }
    }
}

export default TaskManager;