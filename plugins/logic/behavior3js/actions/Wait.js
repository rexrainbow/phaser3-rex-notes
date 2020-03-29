import Action from '../core/Action';
import { SUCCESS, RUNNING } from '../constants';

/**
 * Wait a few seconds.
 *
 * @module b3
 * @class Wait
 * @extends Action
 **/

export default class Wait extends Action {

    /**
     * Creates an instance of Wait.
     * @param {Object} settings Object with parameters
     * @param {Number} settings.milliseconds Maximum time, in milliseconds, a child can execute.
     * @memberof Wait
     */
    constructor({ milliseconds = 0 } = {}) {
        super({
            name: 'Wait',
            title: 'Wait <milliseconds>ms',
            properties: { milliseconds: 0 },
        });

        this.endTime = milliseconds;
    }

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick) {
        var startTime = (new Date()).getTime();
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

        if (currTime - startTime > this.endTime) {
            return SUCCESS;
        }

        return RUNNING;
    }
};
