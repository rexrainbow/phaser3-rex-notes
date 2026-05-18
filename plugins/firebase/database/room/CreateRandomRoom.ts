import GetValue from '../../../utils/object/GetValue';
import GetRandomWord from '../../../utils/string/GetRandomWord';

var CreateRandomRoom = function(config?: any) {
    if (config === undefined) {
        config = {};
    }

    var digits = GetValue(config, 'digits', 10);
    var candidates = GetValue(config, 'candidates', '0123456789');
    var retry = GetValue(config, 'retry', 1000);

    return TryCreateRandomRoom.call(this, digits, candidates, retry, config);
}

var TryCreateRandomRoom = function(digits?: any, candidates?: any, retry?: any, config?: any) {
    config.roomID = GetRandomWord(digits, digits, candidates);
    if (retry <= 0) {
        return Promise.reject(config);
    }
    retry--;
    var self = this;
    return this.createRoom(config)
        .catch(function() {
            return TryCreateRandomRoom.call(self, digits, candidates, retry, config);
        })
}

export default CreateRandomRoom;