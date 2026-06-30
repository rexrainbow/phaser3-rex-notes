import Runner from '../runner/Runner.js';
import GetStartGroupName from './GetStartGroupName.js';

export default {
    startRun() {
        var args = Array.prototype.slice.call(arguments);
        var groupName = GetStartGroupName(this, args);

        return (new Runner(this, {
            groupName,
            args,
        })).start();
    },
}
