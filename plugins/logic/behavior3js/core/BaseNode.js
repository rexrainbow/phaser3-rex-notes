import CreateUUID from '../utils/CreateUUID.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../constants';

/**
 * The BaseNode class is used as super class to all nodes in BehaviorJS. It
 * comprises all common variables and methods that a node must have to
 * execute.
 *
 * **IMPORTANT:** Do not inherit from this class, use `Composite`,
 * `Decorator`, `Action` or `Condition`, instead.
 *
 * The attributes are specially designed to serialization of the node in a
 * JSON format. In special, the `properties` attribute can be set into the
 * visual editor (thus, in the JSON file), and it will be used as parameter
 * on the node initialization at `BehaviorTree.load`.
 *
 * BaseNode also provide 5 callback methods, which the node implementations
 * can override. They are `enter`, `open`, `tick`, `close` and `exit`. See
 * their documentation to know more. These callbacks are called inside the
 * `_execute` method, which is called in the tree traversal.
 *
 * @module b3
 * @class BaseNode
 **/

export default class BaseNode {

    /**
     * Initialization method.
     * @method initialize
     * @constructor
     **/
    constructor({ category, name, title, description, properties } = {}) {

        this.id = CreateUUID();

        /**
         * Node category. Must be `COMPOSITE`, `DECORATOR`, `ACTION` or
         * `CONDITION`. This is defined automatically be inheriting the
         * correspondent class.
         * 
         * @member BaseNode#category
         **/
        this.category = category || '';

        /**
         * Node name. Must be a unique identifier,
         * preferable the same name of the
         * class. You have to set the node name in the prototype.
         * 
         * @member BaseNode#name
         **/
        this.name = name || '';

        /**
         * Node title.
         * 
         * @optional
         * @member BaseNode#title
         **/
        this.title = title || this.name;

        /**
         * Node description.
         * 
         * @member BaseNode#description
         */
        this.description = description || '';

        /**
         * A dictionary (key, value) describing the node properties. Useful for
         * defining custom variables inside the visual editor.
         *
         * @property properties
         * @type {Object}
         * @readonly
         **/
        this.properties = properties || {};
    }

    /**
     * This is the main method to propagate the tick signal to this node. This
     * method calls all callbacks: `enter`, `open`, `tick`, `close`, and
     * `exit`. It only opens a node if it is not already open. In the same
     * way, this method only close a node if the node  returned a status
     * different of `RUNNING`.
     *
     * @method _execute
     * @param {Tick} tick A tick instance.
     * @return {Constant} The tick state.
     * @protected
     **/
    _execute(tick) {
        // ENTER
        this._enter(tick);

        // OPEN
        if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
            this._open(tick);
        }

        // TICK
        var status = this._tick(tick);

        // CLOSE
        if (status !== RUNNING) {
            this._close(tick);
        }

        // EXIT
        this._exit(tick);

        return status;
    }

    /**
     * Wrapper for enter method.
     * @method _enter
     * @param {Tick} tick A tick instance.
     * @protected
     **/
    _enter(tick) {
        tick._enterNode(this);
        this.enter(tick);
    }

    /**
     * Wrapper for open method.
     * @method _open
     * @param {Tick} tick A tick instance.
     * @protected
     **/
    _open(tick) {
        tick._openNode(this);
        tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
        this.open(tick);
    }

    /**
     * Wrapper for tick method.
     * @method _tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     * @protected
     **/
    _tick(tick) {
        tick._tickNode(this);
        return this.tick(tick);
    }

    /**
     * Wrapper for close method.
     * @method _close
     * @param {Tick} tick A tick instance.
     * @protected
     **/
    _close(tick) {
        tick._closeNode(this);
        tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
        this.close(tick);
    }

    /**
     * Wrapper for exit method.
     * @method _exit
     * @param {Tick} tick A tick instance.
     * @protected
     **/
    _exit(tick) {
        tick._exitNode(this);
        this.exit(tick);
    }

    /**
     * Enter method, override this to use. It is called every time a node is
     * asked to execute, before the tick itself.
     *
     * @method enter
     * @param {Tick} tick A tick instance.
     **/
    enter(tick) { }

    /**
     * Open method, override this to use. It is called only before the tick
     * callback and only if the not isn't closed.
     *
     * Note: a node will be closed if it returned `RUNNING` in the tick.
     *
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick) { }

    /**
     * Tick method, override this to use. This method must contain the real
     * execution of node (perform a task, call children, etc.). It is called
     * every time a node is asked to execute.
     *
     * @method tick
     * @param {Tick} tick A tick instance.
     **/
    tick(tick) { }

    /**
     * Close method, override this to use. This method is called after the tick
     * callback, and only if the tick return a state different from
     * `RUNNING`.
     *
     * @method close
     * @param {Tick} tick A tick instance.
     **/
    close(tick) { }

    /**
     * Exit method, override this to use. Called every time in the end of the
     * execution.
     *
     * @method exit
     * @param {Tick} tick A tick instance.
     **/
    exit(tick) { }

    // Return state value
    get SUCCESS() {
        return SUCCESS;
    }

    get FAILURE() {
        return FAILURE;
    }

    get RUNNING() {
        return RUNNING;
    }

    get ERROR() {
        return ERROR;
    }
};
