const GetValue = Phaser.Utils.Objects.GetValue;

class BaseTask {
    constructor(target, parentTask, config) {
        this.target = target;
        this.parentTask = parentTask;
        
        // this.resetFromJSON(config);
        // this.boot();
    }

    resetFromJSON(o) {
        return this;
    }

    toJSON() {
        return {};
    }

    boot() {
        if (this.isRootTask) {
            if (this.target.on) {
                this.target.on('destroy', this.destroy, this);
            }
        }
    }

    get isRootTask() {
        return !this.parentTask;
    }

    preDestroy() {}

    destroy() {
        this.preDestroy();
        this.target = undefined;
    }

    //prestep(time, delta) {}
    //step(time, delta) {}
    //poststep(time, delta) {}
    //prerender(time, delta) {}
    //postrender(time, delta) {}

}

export default BaseTask;