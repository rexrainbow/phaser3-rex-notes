/**
 * Status code for idle.
 */
export const IDLE = 0;
/**
 * Status code for success.
 */
export const SUCCESS = 1;
/**
 * Status code for failure.
 */
export const FAILURE = 2;
/**
 * Status code for running.
 */
export const RUNNING = 3;
/**
 * Status code for abort.
 */
export const ABORT = 5;
/**
 * Status code for error.
 */
export const ERROR = 9;

/**
 * Node category for a tree.
 */
export const TREE = 'tree';
/**
 * Node category for a composite.
 */
export const COMPOSITE = 'composite';
/**
 * Node category for a decorator.
 */
export const DECORATOR = 'decorator';
/**
 * Node category for an action.
 */
export const ACTION = 'action';
/**
 * Node category for an expression.
 */
export const EXPRESSION = 'expression';
/**
 * Node category for a service.
 */
export const SERVICE = 'service';

/**
 * Blackboard key used for tree state.
 */
export const TREE_STATE = '$state';

/**
 * Event emitted when a tree tick starts.
 */
export const EVT_TICK_START = 'tick.start';
/**
 * Event emitted when a tree tick ends.
 */
export const EVT_TICK_END = 'tick.end';

/**
 * Event emitted when a node enters.
 */
export const EVT_NODE_ENTER = 'node.enter';
/**
 * Event emitted when a node opens.
 */
export const EVT_NODE_OPEN = 'node.open';
/**
 * Event emitted when a node ticks.
 */
export const EVT_NODE_TICK = 'node.tick';
/**
 * Event emitted when a node returns status.
 */
export const EVT_NODE_STATUS = 'node.status';
/**
 * Event emitted when a node closes.
 */
export const EVT_NODE_CLOSE = 'node.close';
/**
 * Event emitted when a node exits.
 */
export const EVT_NODE_EXIT = 'node.exit';
/**
 * Event emitted when a node aborts.
 */
export const EVT_NODE_ABORT = 'node.abort';
/**
 * Event emitted when a node writes a diagnostics log message.
 */
export const EVT_NODE_LOG = 'node.log';
