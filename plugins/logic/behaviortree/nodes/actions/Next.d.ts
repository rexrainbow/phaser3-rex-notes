import Action from '../Action';

export default Abort;

declare class Abort extends Action {
    constructor(config?: Action.IConfig);
}