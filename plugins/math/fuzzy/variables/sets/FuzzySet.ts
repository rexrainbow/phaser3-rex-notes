/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzyTerm
*/

class FuzzySet {
    degreeOfMembership: any;
    left: any;
    representativeValue: any;
    right: any;


	constructor(representativeValue = 0) {
		this.degreeOfMembership = 0;
		this.representativeValue = representativeValue;

		this.left = 0;
		this.right = 0;

	}

	computeDegreeOfMembership() { }

	clearDegreeOfMembership() {

		this.degreeOfMembership = 0;

		return this;

	}

	getDegreeOfMembership() {
		return this.degreeOfMembership;

	}

	updateDegreeOfMembership(value?: any) {
		if (value > this.degreeOfMembership) {
			this.degreeOfMembership = value;
		}

		return this;

	}

}

export default FuzzySet;