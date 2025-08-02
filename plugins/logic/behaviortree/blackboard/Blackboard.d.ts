import Base from './Base';

export default Blackboard;

declare namespace Blackboard {
    type MemoryType = Base.MemoryType;

    interface IConfig {
        currentTimeKey?: string;
    }
}

declare class Blackboard extends Base {
    constructor(config?: Blackboard.IConfig);

    currentTimeKey: string;

    getTreeState(treeID: string): number;

    setTreeState(treeID: string, state: number): this;

    hasValidCurrentTime(): boolean;

    setCurrentTime(time: number): this;

    getCurrentTime(): number;

    incCurrentTime(time: number): this;

}