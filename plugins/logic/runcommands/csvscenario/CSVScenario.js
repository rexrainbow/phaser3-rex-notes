import CSVScenarioLogic from './CSVScenarioLogic.js';
import Timer from './timer/Timer.js';

class CSVScenario extends CSVScenarioLogic {
    constructor(scene, config) {
        super(scene, config);
        // this.parent = scene
    }

    boot(scene, config) {
        scene.sys.events.once('shutdown', this.destroy, this);
        super.boot(scene, config);
        return this;
    }

    createTimer(scene, config) {
        return new Timer(scene);
    }
}

export default CSVScenario;