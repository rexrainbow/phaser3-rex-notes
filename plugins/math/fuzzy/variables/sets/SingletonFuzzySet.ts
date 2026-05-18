import FuzzySet from './FuzzySet';

/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzySet
*/
class SingletonFuzzySet extends FuzzySet {
    left: any;
    midpoint: any;
    right: any;

	constructor(left?: any, midpoint?: any, right?: any) {

		super(midpoint);

		this.left = left;
		this.midpoint = midpoint;
		this.right = right;

	}

	computeDegreeOfMembership(value?: any) {
		const left = this.left;
		const right = this.right;
		return (value >= left && value <= right) ? 1 : 0;

	}
}

export default SingletonFuzzySet;