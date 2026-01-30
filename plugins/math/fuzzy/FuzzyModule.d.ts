export default FuzzyModule;

/**
 * Fuzzy logic module with fuzzify and defuzzify helpers.
 */
declare class FuzzyModule {

    /**
     * Fuzzify a single variable.
     *
     * @param name - Variable name.
     * @param value - Input value.
     * @returns This FuzzyModule instance.
     */
    fuzzify(name: string, value: number): this;
    /**
     * Fuzzify multiple variables.
     *
     * @param names - Variable value map.
     * @returns This FuzzyModule instance.
     */
    fuzzify(names: { [name: string]: number }): this;

    /**
     * Defuzzify a variable.
     *
     * @param name - Variable name.
     * @param type - Defuzzify method.
     * @returns This FuzzyModule instance.
     */
    defuzzify(name: string, type?: string): this;
    /**
     * Defuzzify multiple variables.
     *
     * @param name - Variable names.
     * @param type - Defuzzify method.
     * @returns This FuzzyModule instance.
     */
    defuzzify(name?: string[], type?: string): this;
}
