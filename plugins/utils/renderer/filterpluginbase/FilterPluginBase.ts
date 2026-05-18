import RegisterFilter from './RegisterFilter';
import AddFilterListMethod from '../AddFilterListMethod';
import AddController from './AddController';
import RemoveController from './RemoveController';
import GetController from './GetController'

import { Plugins as PhaserPlugins } from 'phaser';
class FilterPluginBase extends PhaserPlugins.BasePlugin {
    ControllerClass: any;
    destroy: any;
    FilterClass: any;
    game: any;

    setFilterClass(FilterClass?: any, ControllerClass?: any) {
        this.FilterClass = FilterClass;
        this.ControllerClass = ControllerClass;
        return this;
    }

    setFilterListMethod(name?: any, callback?: any) {
        AddFilterListMethod(name, callback);
        return this;
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);

        if (this.game.isRunning) {
            RegisterFilter(this.game, this.FilterClass);

        } else {
            eventEmitter.once('ready', function() {
                RegisterFilter(this.game, this.FilterClass);
            }, this)

        }

    }

    add(gameObject?: any, config?: any, external = false) {
        return AddController(gameObject, this.ControllerClass, config, external);
    }

    remove(gameObject?: any, name?: any, external = false) {
        RemoveController(gameObject, this.ControllerClass, name, external);
        return this;
    }

    get(gameObject?: any, name?: any, external = false) {
        return GetController(gameObject, this.ControllerClass, name, external);
    }
}

export default FilterPluginBase;