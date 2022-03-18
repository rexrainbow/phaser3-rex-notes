const GetValue = Phaser.Utils.Objects.GetValue;

var CreateCharacterItem = function (character) {
    return {
        character: character,
        freq: 0,
        alive: false,
        lock: false
    }
}

var GetChatacter = function (collection, character) {
    var item = collection.findOne({ character: character });
    if (item === null) {
        item = CreateCharacterItem(character);
        collection.insert(item);
    }
    return item;
}

var GetInCacheCharacterItems = function (collection, config) {
    var excludeCharacters = GetValue(config, 'exclude', undefined);
    var lock = GetValue(config, 'lock', undefined);

    var filter = { alive: true };

    if (excludeCharacters !== undefined) {
        if (typeof (excludeCharacters) === 'string') {
            excludeCharacters = excludeCharacters.split();
        }
        filter.character = {
            $nin: excludeCharacters
        }
    }

    if (lock !== undefined) {
        filter.lock = lock;
    }

    return collection
        .chain()
        .find(filter)
        .simplesort('freq', { desc: true })
        .data();
}

var GetLockedCharacterItem = function (collection) {
    return collection.find({ lock: true });
}

export {
    GetChatacter,
    GetInCacheCharacterItems,
    GetLockedCharacterItem,
}