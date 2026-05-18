import CSVScenarioLogic from './CSVScenarioLogic';
import Timer from './timer/Timer';

class CSVScenario extends CSVScenarioLogic {
    destroy: any;
    parent: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        // this.parent = scene
    }

    boot(scene?: any, config?: any) {
        scene.sys.events.once('shutdown', this.destroy, this);
        super.boot(scene, config);
        return this;
    }

    createTimer(scene?: any, config?: any) {
        return new Timer(scene);
    }
}

export default CSVScenario;