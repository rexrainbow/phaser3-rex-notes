import Action from '../Action';

export default Error;

declare class Error extends Action {
    constructor(config?: Action.IConfig);
}