const RandomInt = Phaser.Math.Between;
const RandomItem = Phaser.Utils.Array.GetRandom;
const CANDIDATES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

var GetRandomWord = function (min, max, candidates) {
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
