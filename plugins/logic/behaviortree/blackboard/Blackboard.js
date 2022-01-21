import Base from './Base.js';
import { CURRENT_TIME } from '../constants.js';

class Blackboard extends Base {
    setCurrentTime(time) {
        this.set(CURRENT_TIME, time);
    }
};

export default Blackboard;