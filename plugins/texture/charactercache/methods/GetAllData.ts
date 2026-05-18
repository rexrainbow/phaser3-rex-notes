import { GetAllItems } from './CharacterQueryMethods';

var GetAllData = function() {
    return GetAllItems(this.characterCollection);
}

export default GetAllData;