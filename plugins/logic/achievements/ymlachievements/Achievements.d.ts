import Base from '../achievements/Achievements';

export default Achievements;

declare namespace Achievements {
}

/**
 * Achievement manager with YML loading support.
 */
declare class Achievements extends Base {
    /**
     * Load achievements from YML string.
     *
     * @param ymlString - YML content.
     * @returns This Achievements instance.
     */
    loadYML(
        ymlString: string
    ): this;
}
