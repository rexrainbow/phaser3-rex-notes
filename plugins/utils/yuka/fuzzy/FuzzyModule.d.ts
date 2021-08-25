export default FuzzyModule;

declare class FuzzyModule {

    fuzzify(name: string, value: number): this;

    defuzzify(name: string, type?: string): this;
}