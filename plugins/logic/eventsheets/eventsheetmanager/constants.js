/**
 * Start running an event sheet group.
 *
 * Params: (groupName, eventSheetManager, eventSheetGroup)
 */
export const EVT_GROUP_START = 'start';

/**
 * Continue running an event sheet group after a pause or between pending sheets.
 *
 * Params: (groupName, eventSheetManager, eventSheetGroup)
 */
export const EVT_GROUP_CONTINUE = 'continue';

/**
 * Complete one run of an event sheet group.
 *
 * Params: (groupName, eventSheetManager, eventSheetGroup)
 */
export const EVT_GROUP_COMPLETE = 'complete';

/**
 * Stop an event sheet group and abort pending sheets.
 *
 * Params: (groupName, eventSheetManager, eventSheetGroup)
 */
export const EVT_GROUP_STOP = 'stop';

/**
 * Add an event sheet to a group.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_ADD = 'eventsheet.add';

/**
 * Remove an event sheet from a group.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_REMOVE = 'eventsheet.remove';

/**
 * Remove all event sheets from a group.
 *
 * Params: (groupName, sheetTitles, eventSheetManager, eventSheetGroup)
 */
export const EVT_EVENTSHEET_REMOVE_ALL = 'eventsheet.removeall';

/**
 * Open an event sheet for condition evaluation and execution.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_OPEN = 'eventsheet.open';

/**
 * Finish event sheet condition evaluation.
 *
 * Params: (sheetTitle, groupName, conditionPassed, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_CONDITION = 'eventsheet.condition';

/**
 * Enter an event sheet whose condition passed.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_ENTER = 'eventsheet.enter';

/**
 * Catch an event sheet whose condition did not pass.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_CATCH = 'eventsheet.catch';

/**
 * Tick an opened event sheet.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_TICK = 'eventsheet.tick';

/**
 * Finish ticking an event sheet and report its behavior-tree status.
 *
 * Params: (sheetTitle, groupName, status, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_STATUS = 'eventsheet.status';

/**
 * Close an event sheet at the end of this round.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_CLOSE = 'eventsheet.close';

/**
 * Exit an event sheet whose condition passed.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_EXIT = 'eventsheet.exit';

/**
 * Skip an event sheet before opening it.
 *
 * Params: (sheetTitle, groupName, reason, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_SKIP = 'eventsheet.skip';

/**
 * Abort a pending event sheet during group stop.
 *
 * Params: (sheetTitle, groupName, eventSheetManager, eventSheet, eventSheetGroup)
 */
export const EVT_EVENTSHEET_ABORT = 'eventsheet.abort';

/**
 * Enter a label node inside an event sheet.
 *
 * Params: (labelTitle, sheetTitle, groupName, eventSheetManager, eventSheet, labelNode, eventSheetGroup)
 */
export const EVT_LABEL_ENTER = 'label.enter';

/**
 * Exit a label node inside an event sheet.
 *
 * Params: (labelTitle, sheetTitle, groupName, eventSheetManager, eventSheet, labelNode, eventSheetGroup)
 */
export const EVT_LABEL_EXIT = 'label.exit';

/**
 * Start executing a command task.
 *
 * Params: (commandName, parameters, sheetTitle, groupName, eventSheetManager, eventSheet, taskNode, eventSheetGroup)
 */
export const EVT_COMMAND_START = 'command.start';

/**
 * Finish executing a command task.
 *
 * Params: (commandName, parameters, success, result, sheetTitle, groupName, eventSheetManager, eventSheet, taskNode, eventSheetGroup)
 */
export const EVT_COMMAND_END = 'command.end';

/**
 * Pause a command task and wait for resume.
 *
 * Params: (commandName, parameters, sheetTitle, groupName, eventSheetManager, eventSheet, taskNode, eventSheetGroup)
 */
export const EVT_COMMAND_PAUSE = 'command.pause';

/**
 * Resume a paused command task.
 *
 * Params: (commandName, parameters, sheetTitle, groupName, eventSheetManager, eventSheet, taskNode, eventSheetGroup)
 */
export const EVT_COMMAND_RESUME = 'command.resume';

/**
 * Abort a command task.
 *
 * Params: (commandName, parameters, sheetTitle, groupName, eventSheetManager, eventSheet, taskNode, eventSheetGroup)
 */
export const EVT_COMMAND_ABORT = 'command.abort';

/**
 * Evaluate a condition on the execution path.
 *
 * Params: (expression, result, sheetTitle, groupName, eventSheetManager, eventSheet, conditionNode, eventSheetGroup)
 */
export const EVT_CONDITION_EVAL = 'condition.eval';

/**
 * Wait for pointer click.
 *
 * Params: ()
 */
export const EVT_PAUSE_CLICK = 'pause.click';

/**
 * Wait for a keyboard key.
 *
 * Params: (key)
 */
export const EVT_PAUSE_KEY = 'pause.key';

/**
 * Wait for pointer input.
 *
 * Params: ()
 */
export const EVT_PAUSE_INPUT = 'pause.input';

/**
 * Resume from pointer input.
 *
 * Params: ()
 */
export const EVT_RESUME_INPUT = 'resume.input';
