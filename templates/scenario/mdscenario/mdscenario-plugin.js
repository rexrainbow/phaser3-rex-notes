import ScenarioPluginBase from '../ScenarioPluginBase.js';
import MDScenario from './MDScenario.js';
import CSV2MD from '../../../plugins/logic/eventsheets/markedeventsheets/CSV2MD.js';

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