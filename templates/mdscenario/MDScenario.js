import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import CreateCommandExecutor from './commandexecutor/CreateCommandExecutor.js';
import RegisterExpressions from './expressions/RegisterExpressions.js';
import RegisterDefaultVariables from './defaultvariables/RegisterDefaultVariables.js';

class MDScenario extends MarkedEventSheets {
    constructor(scene, config = {}) {
        config.commandExecutor = CreateCommandExecutor(scene, config);
        super(config);

        // this.commandExecutor;

        RegisterExpressions(this, config);

        RegisterDefaultVariables(this, config);
    }
}

export default MDScenario;