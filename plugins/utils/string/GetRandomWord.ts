import RandomInt from '../math/Between';
import RandomItem from '../array/GetRandom';

const CANDIDATES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var GetRandomWord = function(min?: any, max?: any, candidates?: any) {
    if (candidates === undefined) {
        candidates = CANDIDATES;
    }
    var count = (max === undefined) ? min : RandomInt(min, max);
    var word = '';
    for (var j = 0; j < count; j++) {
        word += RandomItem(candidates);
    }
    return word;
}

export default GetRandomWord;