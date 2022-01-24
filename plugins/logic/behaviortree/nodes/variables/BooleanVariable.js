import Variable from './Variable.js';

class BooleanVariable extends Variable {
    eval(context) {
        return !!super.eval(context);
    }
}

export default BooleanVariable;