import DefaultVariables from './DefaultVariables';
import Merge from '../../../plugins/utils/object/Merge';


var RegisterDefaultVariables = function(eventSheetManager?: any, config?: any) {
    var { defaultVariables } = config;
    defaultVariables = Merge(defaultVariables, DefaultVariables);

    for (var key in defaultVariables) {
        eventSheetManager.setData(key, defaultVariables[key]);
    }
}

export default RegisterDefaultVariables;