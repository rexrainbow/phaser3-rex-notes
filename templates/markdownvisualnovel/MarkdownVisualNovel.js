import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import CreateCommandExecutor from './commandexecutor/CreateCommandExecutor.js';
import RegisterExpressions from './expressions/RegisterExpressions.js';

class MarkdownVisualNovel extends MarkedEventSheets {
    constructor(scene, config = {}) {
        config.commandExecutor = CreateCommandExecutor(scene, config);
        super(config);

        // this.commandExecutor;

        RegisterExpressions(this);
    }
}

export default MarkdownVisualNovel;