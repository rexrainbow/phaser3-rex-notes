import Composite from '../core/Composite';
import { SUCCESS, RUNNING } from '../constants';

/**
 * MemSequence is similar to Sequence node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the
 * MemPriority call the child recorded directly, without calling previous
 * children again.
 *
 * @module b3
 * @class MemSequence
 * @extends Composite
 **/

export default class MemSequence extends Composite {

    /**
     * Creates an instance of MemSequence.
     * @param {Object} params 
     * @param {Array} params.children 
     * @memberof MemSequence
     */
    constructor({ children = [] } = {}) {
        super({
            name: 'MemSequence',
            children
        });
    }

    /**
     * Open method.
     * @method open
     * @param {b3.Tick} tick A tick instance.
     **/
    open(tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
        for (var i = child; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== SUCCESS) {
                if (status === RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                }
                return status;
            }
        }

        return SUCCESS;
    }
};
