import CSVScenarioLogic from './CSVScenarioLogic.js';
import Timer from './timer/Timer.js';

class CSVScenario extends CSVScenarioLogic {
    constructor(scene, config) {
        super(scene, config);
        // this.parent = scene
    }

    boot() {
        this.parent.sys.events.once('shutdown', this.destroy, this);
    }

    createTimer() {
        return new Timer(this.parent);
    }
}

export default CSVScenario;