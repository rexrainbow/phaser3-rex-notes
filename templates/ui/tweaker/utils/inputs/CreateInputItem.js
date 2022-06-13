import CreateInputTitle from './CreateInputTitle.js';
import {
    StringType, NumberType, NumberRangeType, ListType,
    BooleanType, ColorType, Pointer2dType, Pointer3dType,
} from './InputTypes.js';
import CreateTextInput from './CreateTextInput.js';
import CreateNumberInput from './CreateNumberInput.js';

const CreatrInputCallbacks = {};
CreatrInputCallbacks[StringType] = CreateTextInput;
CreatrInputCallbacks[NumberType] = CreateNumberInput;

var CreateInputItem = function (maker, config) {
    var sizer = maker.make({
        $class: 'InputItem',
    })

    var isHorizontalSizer = (sizer.orientation === 0);

    sizer
        .add(
            CreateInputTitle(maker, config),
            {
                proportion: (isHorizontalSizer) ? 1 : 0
            }
        )
        // .add(
        //     CreatrInputCallbacks(maker, config),
        //     {
        //         proportion: (isHorizontalSizer) ? 2 : 0
        //     }
        // )

    return sizer;
}

export default CreateInputItem;