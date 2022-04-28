import Setup from './Setup.js';
import Update from './Update.js';
import Draw from './Draw.js';

import SetExpression from './SetExpression.js';
import SetRandomExpression from './SetRandomExpression.js';
import GetExpressionNames from './GetExpressionNames.js';

var Methods = {
    setup: Setup,
    update: Update,
    draw: Draw,

    setExpression: SetExpression,
    setRandomExpression: SetRandomExpression,
    getExpressionNames: GetExpressionNames,
}

export default Methods;