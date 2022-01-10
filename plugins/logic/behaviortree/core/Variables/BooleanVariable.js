import NumberVariable from './NumberVariable.js';

class BooleanVariable extends NumberVariable {
    eval(context) {
        return !!super.eval(context);
    }
}

export default BooleanVariable;