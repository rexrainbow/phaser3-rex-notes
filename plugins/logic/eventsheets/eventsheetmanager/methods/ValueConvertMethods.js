import Compile from '../../../../math/expressionparser/utils/Complile.js';
import handlebars from 'handlebars';

export default {
    evalExpression(s) {
        if (typeof (s) !== 'string') {
            return s;
        }

        return Compile(s)(this.memory);
    },

    renderString(s) {
        if (typeof (s) !== 'string') {
            return '';
        }
        return handlebars.render(s, this.memory);
    },
}