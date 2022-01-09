import BaseVariable from './BaseVariable.js';
import Handlebars from 'handlebars';

class StringVariable extends BaseVariable {
    constructor(expression) {
        super();

        var callback = Handlebars.compile(expression);
        this.setExpressionHandler(callback);
    }
}

export default StringVariable;