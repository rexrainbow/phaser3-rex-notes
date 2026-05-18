import FuzzyCompositeTerm from './FuzzyCompositeTerm';

/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzyCompositeTerm
*/
class FuzzyFAIRLY extends FuzzyCompositeTerm {
    terms: any;


	constructor(fuzzyTerm?: any) {
		super([fuzzyTerm]);
	}

	clearDegreeOfMembership() {
		this.terms[0].clearDegreeOfMembership();
		return this;
	}

	getDegreeOfMembership() {
		const dom = this.terms[0].getDegreeOfMembership();
		return Math.sqrt(dom);
	}

	updateDegreeOfMembership(value?: any) {
		this.terms[0].updateDegreeOfMembership(Math.sqrt(value));
		return this;
	}

}

export default FuzzyFAIRLY;