/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzyTerm
*/
class FuzzyCompositeTerm {
    terms: any;


	constructor(terms?: any) {
		this.terms = terms;
	}

	clearDegreeOfMembership() {
		const terms = this.terms;
		for (let i = 0, l = terms.length; i < l; i++) {
			terms[i].clearDegreeOfMembership();

		}

		return this;
	}

	updateDegreeOfMembership(value?: any) {
		const terms = this.terms;
		for (let i = 0, l = terms.length; i < l; i++) {
			terms[i].updateDegreeOfMembership(value);

		}

		return this;

	}

}

export default FuzzyCompositeTerm;