import FuzzySet from './FuzzySet';

/**
* @author {@link https://github.com/robp94|robp94}
* @augments FuzzySet
*/
class NormalDistFuzzySet extends FuzzySet {
    _cache: any;
    left: any;
    midpoint: any;
    right: any;
    standardDeviation: any;


	constructor(left?: any, midpoint?: any, right?: any, standardDeviation?: any) {
		super(midpoint);

		this.left = left;
		this.midpoint = midpoint;
		this.right = right;
		this.standardDeviation = standardDeviation;
		this._cache = {};

	}

	computeDegreeOfMembership(value?: any) {

		this._updateCache();

		if (value >= this.right || value <= this.left) {
			return 0;
		}

		return ProbabilityDensity(value, this.midpoint, this._cache.variance) / this._cache.normalizationFactor;

	}

	_updateCache() {

		const cache = this._cache;
		const midpoint = this.midpoint;
		const standardDeviation = this.standardDeviation;

		if (midpoint !== cache.midpoint || standardDeviation !== cache.standardDeviation) {

			const variance = standardDeviation * standardDeviation;

			cache.midpoint = midpoint;
			cache.standardDeviation = standardDeviation;
			cache.variance = variance;

			// this value is used to ensure the DOM lies in the range of [0,1]

			cache.normalizationFactor = ProbabilityDensity(midpoint, midpoint, variance);

		}

		return this;

	}

}

var ProbabilityDensity = function(x?: any, mean?: any, variance?: any) {

	return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(- (Math.pow((x - mean), 2)) / (2 * variance));

}

export default NormalDistFuzzySet;