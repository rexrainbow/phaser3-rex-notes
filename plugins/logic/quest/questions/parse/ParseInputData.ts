import GetValue from '../../../../utils/object/GetValue';
import ParseCSV from './ParseCSV';
import ParseYaml from './ParseYaml';

var ParseInputData = function(inputData?: any, config?: any) {
    if (typeof (config) === 'string') {
        config = { format: config };
    }

    var inputType;
    if (typeof (inputData) === 'string') {
        inputType = GetValue(config, 'format', 'csv');
    } else {
        inputType = GetValue(config, 'format', undefined);
    }

    switch (inputType?: any) {
        case 'csv':
            inputData = ParseCSV(inputData, config);
            break;

        case 'yaml':
            inputData = ParseYaml(inputData, config);
            break;

        case 'json':
            inputData = JSON.parse(inputData);
            break;
    }

    return inputData;
}

export default ParseInputData;