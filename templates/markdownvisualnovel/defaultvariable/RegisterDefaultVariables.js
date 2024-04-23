import DefaultVariables from './DefaultVariables.js';
import Merge from '../../../plugins/utils/object/Merge.js';


var RegisterDefaultVariables = function (eventSheetManager, config) {
    var { defaultVariables } = config;
    defaultVariables = Merge(defaultVariables, DefaultVariables);

    for (var key in defaultVariables) {
        eventSheetManager.setData(key, defaultVariables[key]);
    }
}

export default RegisterDefaultVariables;