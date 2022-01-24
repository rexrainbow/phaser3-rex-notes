import WeightSelector from '../WeightSelector.js';

class RandomSelector extends WeightSelector {
    constructor(
        {
            expression = null,
            children = [],
            name = 'RandomSelector'
        } = {},
        nodePool
    ) {

        super(
            {
                expression,
                children,
                name
            },
            nodePool
        )
    }
};

export default RandomSelector;