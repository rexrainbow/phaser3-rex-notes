import FuzzyModule from './FuzzyModule';
export default BuildFuzzyModule;

declare namespace BuildFuzzyModule {
    /**
     * Fuzzy set configuration tuple.
     */
    type FuzzySetConfig =
        [string, number, number, number, string] |
        [string, number, number, number];

    /**
     * Configuration options for building a fuzzy module.
     */
    interface IConfig {
        /**
         * Variable definitions.
         */
        variables: string | string[] | { [varName: string]: FuzzySetConfig[] },
        /**
         * Rule definitions.
         */
        rules: string | string[]
    }
}

/**
 * Build a FuzzyModule from a config string.
 *
 * @param config - Config string.
 * @returns The created FuzzyModule.
 */
declare function BuildFuzzyModule(
    config: string
): FuzzyModule;

/**
 * Build a FuzzyModule from config data.
 *
 * @param config - Config object.
 * @returns The created FuzzyModule.
 */
declare function BuildFuzzyModule(
    config: BuildFuzzyModule.IConfig
): FuzzyModule;
