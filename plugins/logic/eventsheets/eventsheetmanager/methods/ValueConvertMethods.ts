import Compile from '../../../../math/expressionparser/utils/Complile';
import handlebars from 'handlebars';

export default {
    evalExpression(s?: any) {
        if (typeof (s) !== 'string') {
            return s;
        }

        return Compile(s)(this.memory);
    },

    renderString(s?: any) {
        if (typeof (s) !== 'string') {
            return '';
        }
        return handlebars.render(s, this.memory);
    },
}