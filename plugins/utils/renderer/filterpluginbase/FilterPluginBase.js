import RegisterFilter from './RegisterFilter.js';
import AddFilterListMethod from '../AddFilterListMethod.js';
import AddController from './AddController.js';
import RemoveController from './RemoveController.js';
import GetController from './GetController.js'

class FilterPluginBase extends Phaser.Plugins.BasePlugin {
    setFilterClass(FilterClass, ControllerClass) {
        this.FilterClass = FilterClass;
        this.ControllerClass = ControllerClass;
        return this;
    }

    setFilterListMethod(name, callback) {
        AddFilterListMethod(name, callback);
        return this;
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);

        if (this.game.isRunning) {
            RegisterFilter(this.game, this.FilterClass);

        } else {
            eventEmitter.once('ready', function () {
                RegisterFilter(this.game, this.FilterClass);
            }, this)

        }

    }

    add(gameObject, config, external = false) {
        return AddController(gameObject, this.ControllerClass, config, external);
    }

    remove(gameObject, name, external = false) {
        RemoveController(gameObject, this.ControllerClass, name, external);
        return this;
    }

    get(gameObject, name, external = false) {
        return GetController(gameObject, this.ControllerClass, name, external);
    }
}

export default FilterPluginBase;