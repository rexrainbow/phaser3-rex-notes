import ScenarioPluginBase from '../ScenarioPluginBase';
import MDScenario from './MDScenario';
import CSV2MD from '../../../plugins/logic/eventsheets/markedeventsheets/CSV2MD';

class MDScenarioPlugin extends ScenarioPluginBase(MDScenario) {
}

var methods = {
    csv2md: CSV2MD
}

Object.assign(
    MDScenarioPlugin.prototype,
    methods,
)

export default MDScenarioPlugin;