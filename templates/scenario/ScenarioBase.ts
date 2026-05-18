import EventSheetManager from '../../plugins/logic/eventsheets/eventsheetmanager/EventSheetManager';
import CreateCommandExecutor from './commandexecutor/CreateCommandExecutor';
import RegisterExpressions from './expressions/RegisterExpressions';
import RegisterDefaultVariables from './defaultvariables/RegisterDefaultVariables';

var Base = function(EventSheetManagerClass?: any) {
    if (EventSheetManagerClass === undefined) {
        EventSheetManagerClass = EventSheetManager;
    }
    return class Base extends EventSheetManagerClass {
    commandExecutor: any;

        constructor(scene?: any, config = {}) {
            config.commandExecutor = CreateCommandExecutor(scene, config);
            super(config);

            // this.commandExecutor;

            RegisterExpressions(this, config);

            RegisterDefaultVariables(this, config);
        }
    }
}

export default Base;