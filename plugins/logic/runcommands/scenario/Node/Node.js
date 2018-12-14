
import InstMem from './InstMem.js';

class Node {
    constructor(scenario, key) {
        this.scenario = scenario;
        this.key = key;
        this.instMem = new InstMem();
    }

    clear() {
        this.instMem.clear();
        return this;
    }

    append(item) {
        this.instMem.append(item);
        return this;
    }
}
export default Node;