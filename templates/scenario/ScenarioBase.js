import EventSheetManager from '../../plugins/logic/eventsheets/eventsheetmanager/EventSheetManager.js';
import CreateCommandExecutor from './commandexecutor/CreateCommandExecutor.js';
import RegisterExpressions from './expressions/RegisterExpressions.js';
import RegisterDefaultVariables from './defaultvariables/RegisterDefaultVariables.js';

var Base = function (EventSheetManagerClass) {
    if (EventSheetManagerClass === undefined) {
        EventSheetManagerClass = EventSheetManager;
    }
    return class Base extends EventSheetManagerClass {
        constructor(scene, config = {}) {
            config.commandExecutor = CreateCommandExecutor(scene, config);
            super(config);

            // this.commandExecutor;

            RegisterExpressions(this, config);

            RegisterDefaultVariables(this, config);
        }
    }
}

export default Base;