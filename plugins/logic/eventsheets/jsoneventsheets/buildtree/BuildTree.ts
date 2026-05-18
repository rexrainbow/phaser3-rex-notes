import { ForceFailure } from '../../../behaviortree/index';
import EventSheet from '../../eventsheetmanager/eventsheet/EventSheet';
import GetTreeConfig from './GetTreeConfig';
import GetConditionExpression from './GetConditionExpression';
import CreateActionSequence from './CreateActionSequence';


var BuildTree = function (
    eventSheetManager,
    jsonData,
    config = {}
) {

    var {
        title,
        condition = [],
        script,
        fallback,
    } = jsonData;

    var {
        groupName,
        parallel = false,
        active = true,
        once = false,
    } = config;

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

export default BuildTree;