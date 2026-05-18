import ObjectFactory from './parse/ObjectFactory';
import Preload from './parse/utils/preload/Preload';
import PageLoaderFactory from './parse/pageloader/Factory'
import ItemTableFactory from './parse/itemtable/Factory';
import LeaderBoardFactory from './parse/leaderboard/Factory';
import QuickLogin from './parse/quicklogin/QuickLogin';

class ParsePlugin {
    add: any;

    constructor() {
        this.add = new ObjectFactory();
    }

    preload(url?: any) {
        return Preload(url);
    }
}

var methods = {
    quickLogin: QuickLogin
}
Object.assign(
    ParsePlugin.prototype,
    methods
);


export default ParsePlugin;