import { ForceFailure } from '../../../behaviortree/index.js';
import EventSheet from '../../eventsheetmanager/eventsheet/EventSheet.js';
import ParseYaml from '../../../../utils/yaml/ParseYaml.js';
import GetTreeConfig from './GetTreeConfig.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateActionSequence from './CreateActionSequence.js';


var Marked2Tree = function (
    eventSheetManager,
    yamlString,
    {
        groupName,
        parallel = false,
        active = true,
        once = false,
    } = {}
) {

    var jsonData;
    if (typeof (yamlString) === 'string') {
        jsonData = ParseYaml(yamlString);
    } else {
        jsonData = yamlString;
    }

    var {
        title,
        condition = [],
        script,
        fallback,
    } = jsonData;

    var treeConfig = Object.assign(
        { groupName, parallel, active, once },
        GetTreeConfig(jsonData)
    );

    var eventsheet = new EventSheet(
        eventSheetManager,
        {
            title: title,
            condition: GetConditionExpression(condition),
            properties: treeConfig
        }
    );

    // Build node tree
    var taskSequence = CreateActionSequence(script);
    eventsheet.root.addChild(taskSequence);

    var forceFailure = new ForceFailure();
    forceFailure.addChild(CreateActionSequence(fallback));
    eventsheet.root.addChild(forceFailure);

    return eventsheet;
}

export default Marked2Tree;