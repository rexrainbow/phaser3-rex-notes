import { ForceFailure, Succeeder } from '../../../behaviortree/index.js';
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
        lineBreak = '\\',
        commentLineStart = '\/\/',
        parallel = false,
        active = true,
        once = false,
    } = {}
) {

    var jsonData = ParseYaml(yamlString);
    var {
        title,
        condition = [],
        script = [],
        catch: catchScript = [],
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
    if (catchScript && catchScript.length > 0) {
        forceFailure.addChild(CreateActionSequence(catchScript));
    } else {
        forceFailure.addChild(new Succeeder());
    }
    eventsheet.root.addChild(forceFailure);

    return eventsheet;
}

export default Marked2Tree;