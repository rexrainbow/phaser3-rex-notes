(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexparse = factory());
})(this, (function () { 'use strict';

    class ObjectFactory {
        constructor() {
        }

        initializeApp(config) {
            firebase.initializeApp(config);
            return this;
        }

        static register(type, callback) {
            ObjectFactory.prototype[type] = callback;
        }
    }

    var LoadScript = function (url, onload) {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0, cnt = scripts.length; i < cnt; i++) {
            if (scripts[i].src.indexOf(url) != -1) {
                if (onload) {
                    onload();
                }
                return;
            }
        }

        var newScriptTag = document.createElement('script');
        newScriptTag.setAttribute('src', url);

        if (onload) {
            newScriptTag.onload = onload;
        }

        document.head.appendChild(newScriptTag);
    };

    var LoadScriptPromise = function (url) {
        return new Promise(function (resolve, reject) {
            LoadScript(url, resolve);
        });
    };

    const VERSION = '2.11.0';
    const CDNURL = `https://npmcdn.com/parse@${VERSION}/dist/parse.min.js`;

    var Preload = function (url) {
        if (url === undefined) {
            url = CDNURL;
        }

        return LoadScriptPromise(url);
    };

    var GetValue = function (source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }

        if (typeof (key) === 'string') {
            if (source.hasOwnProperty(key)) {
                return source[key];
            }
            if (key.indexOf('.') !== -1) {
                key = key.split('.');
            } else {
                return defaultValue;
            }
        }

        var keys = key;
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (parent.hasOwnProperty(key)) {
                //  Yes it has a key property, let's carry on down
                value = parent[key];

                parent = value;
            }
            else {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    };

    var Query = function (config) {
        if (config.startIndex === undefined) {
            config.startIndex = 0;
        }
        if (config.totalLines === undefined) {
            config.totalLines = Infinity;
        }
        if (config.linesPerPage === undefined) {
            config.linesPerPage = 1000;
        }
        config.remainderLines = config.totalLines;

        return QueryNextPage(config);
    };

    var QueryNextPage = function (config) {
        var query = config.query;
        var lineCount = Math.min(config.remainderLines, config.linesPerPage);
        config.remainderLines -= lineCount;
        return query.skip(config.startIndex).limit(lineCount).find()
            .then(function (items) {
                var done = (config.remainderLines === 0) || (items.length < lineCount);  // Is last page
                if (config.forEachPageCallback) {
                    done |= !!config.forEachPageCallback(items);
                }

                if (done) {
                    var out;
                    if (config.resolveCallback) {
                        out = config.resolveCallback();
                    }
                    return Promise.resolve(out);
                } else {
                    config.startIndex += items.length;
                    return QueryNextPage(config);
                }
            })
    };

    var Load = function (query, startIndex, totalLines) {
        var out = [];
        return Query({
            query: query,
            startIndex: startIndex,
            totalLines: totalLines,
            forEachPageCallback: function (items) {
                out.push(...items);
            },
            resolveCallback: function () {
                return out;
            }
        })
    };

    var Methods$5 = {
        loadItems(startIndex, itemCount) {
            if (startIndex === undefined) {
                startIndex = 0;
            }
            if (itemCount === undefined) {
                itemCount = Infinity;
            }

            this.items.length = 0;

            var self = this;
            return Load(this.query, startIndex, itemCount)
                .then(function (items) {
                    self.items = items;
                    self.startIndex = startIndex;
                    self.pageIndex = Math.floor(startIndex / self.itemCount);
                    self.isFullPage = (itemCount === Infinity) ? true : (itemCount === items.length);
                    return Promise.resolve(items);
                })
                .catch(function (error) {
                    self.isFullPage = false;
                    return Promise.reject(error);
                })
        },

        loadPage(pageIndex) {
            var startIndex = pageIndex * this.itemCount;
            return this.loadItems(startIndex, this.itemCount);
        },

        loadFirstPage() {
            return this.loadItems(0, this.itemCount);
        },

        loadCurrentPage() {
            return this.loadItems(this.startIndex, this.itemCount);
        },

        loadNextPage() {
            var startIndex = this.startIndex + this.itemCount;
            return this.loadItems(startIndex, this.itemCount);
        },

        loadPreviousPage() {
            var startIndex = this.startIndex - this.itemCount;
            return this.loadItems(startIndex, this.itemCount);
        }
    };

    class PageLoader {
        constructor(config) {
            this.items = [];
            this.startIndex = 0;
            this.pageIndex = 0;
            this.isFullPage = false;
            this.setItemCount(GetValue(config, 'itemCount', 100));
            this.setQuery(GetValue(config, 'query', undefined));
        }

        setItemCount(itemCount) {
            this.itemCount = itemCount;
            this.pageIndex = Math.floor(this.startIndex / itemCount);
            return this;
        }

        setQuery(query) {
            this.query = query;
            return this;
        }

        getItem(i) {
            return this.items[i - this.startIndex];
        }

        findFirst(key, value) {
            for (var i, cnt = this.items.length; i < cnt; i++) {
                if (this.items[i].get(key) === value) {
                    return i + this.startIndex;
                }
            }
            return -1;
        }

    }

    Object.assign(
        PageLoader.prototype,
        Methods$5
    );

    var IsInValidKey = function (keys) {
        return (keys == null) || (keys === '') || (keys.length === 0);
    };

    var GetEntry = function (target, keys, defaultEntry) {
        var entry = target;
        if (IsInValidKey(keys)) ; else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                    var newEntry;
                    if (i === cnt - 1) {
                        if (defaultEntry === undefined) {
                            newEntry = {};
                        } else {
                            newEntry = defaultEntry;
                        }
                    } else {
                        newEntry = {};
                    }

                    entry[key] = newEntry;
                }

                entry = entry[key];
            }
        }

        return entry;
    };

    var SetValue = function (target, keys, value, delimiter) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        // no object
        if (typeof (target) !== 'object') {
            return;
        }

        // invalid key
        else if (IsInValidKey(keys)) {
            // don't erase target
            if (value == null) {
                return;
            }
            // set target to another object
            else if (typeof (value) === 'object') {
                target = value;
            }
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split(delimiter);
            }

            var lastKey = keys.pop();
            var entry = GetEntry(target, keys);
            entry[lastKey] = value;
        }

        return target;
    };

    ObjectFactory.register('pageLoader', function (config) {
        return new PageLoader(config);
    });

    SetValue(window, 'RexPlugins.Parse.PageLoader', PageLoader);

    var GetQuery = function (data) {
        var query = this.baseQuery;
        var isItem = (data instanceof this.customClass);
        var key, value;
        for (var i = 0, cnt = this.primaryKeys.length; i < cnt; i++) {
            key = this.primaryKeys[i];
            value = (isItem) ? data.get(key) : data[key];
            query.equalTo(key, value);
        }
        return query;
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    /**
     * Shuffles the contents of the given array using the Fisher-Yates implementation.
     *
     * The original array is modified directly and returned.
     *
     * @function Phaser.Utils.Array.Shuffle
     * @since 3.0.0
     *
     * @param {array} array - The array to shuffle. This array is modified in place.
     *
     * @return {array} The shuffled array.
     */
    var Shuffle = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    };

    var LoadRandomItems = function (query, count) {
        if (typeof (query) === 'number') {
            count = query;
            query = undefined;
        }
        if (query === undefined) {
            query = this.baseQuery;
        }
        if (count === undefined) {
            count = 1;
        }

        // Load all item Id
        query.select('id');
        var self = this;
        return Load(query)
            .then(function (items) {
                // Shuffle items
                Shuffle(items);
                count = Math.min(count, items.length);
                var itemIds = [];
                for (var i = 0; i < count; i++) {
                    itemIds.push(items[i].id);
                }
                // Load first N items by item Id
                query = self.baseQuery.containedIn('objectId', itemIds);
                return Load(query)
            })
    };

    var Methods$4 = {
        loadItem(itemId, select) {
            if (typeof (itemId) === 'string') {
                var query = this.baseQuery;
                if (select) {
                    query = query.select(select);
                }
                return query.get(itemId);
            } else { // Query by primary keys
                var query = this.getQuery(itemId).limit(1);
                if (select) {
                    query = query.select(select);
                }
                return query.find()
                    .then(function (result) {
                        return Promise.resolve(result[0]);
                    })
            }
        },

        loadPage(pageIndex) {
            return this.pageLoader.loadPage(pageIndex);
        },

        loadCurrentPage() {
            return this.pageLoader.loadCurrentPage();
        },

        loadNextPage() {
            return this.pageLoader.loadNextPage();
        },

        loadPreviousPage() {
            return this.pageLoader.loadPreviousPage();
        },

        loadItems(startIndex, itemCount) {
            return this.pageLoader.loadItems(startIndex, itemCount);
        },

        load(query) {
            if (query === undefined) {
                query = this.baseQuery;
            }
            return Load(query);
        },

        loadRandomItems: LoadRandomItems
    };

    var Delete = function (query) {
        query.select('id');

        return Load(query)
            .then(function (items) {
                if (items.length === 0) {
                    return Promise.resolve();
                }
                return Parse.Object.destroyAll(items);
            });
    };

    var Methods$3 = {
        deleteItem(itemId) {
            return this.createItem().set('id', itemId).destroy();
        },

        delete(query) {
            if (query === undefined) {
                query = this.baseQuery;
            }
            return Delete(query);
        }
    };

    var Copy = function (dest, src, startIdx, endIdx) {
        if (startIdx === undefined) {
            startIdx = 0;
        }    if (endIdx === undefined) {
            endIdx = src.length;
        }
        dest.length = endIdx - startIdx;
        for (var i = 0, len = dest.length; i < len; i++) {
            dest[i] = src[i + startIdx];
        }
        return dest;
    };

    var IsArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var DataToItem = function (data, itemClass, item) {
        if (!item) {
            item = new itemClass();
        }
        item.set(data);
        return item;
    };

    var SetOwnerAccessMode = function (item, ownerRead, ownerWrite) {
        if (!ownerRead && !ownerWrite) {
            return item;
        }
        var currentUser = Parse.User.current();
        if (!currentUser) {
            return item;
        }
        var acl = new Parse.ACL(currentUser);
        if (!ownerWrite) {
            acl.setPublicWriteAccess(true);
        }

        if (!ownerRead) {
            acl.setPublicReadAccess(true);
        }
        item.setACL(acl);
        return item;
    };

    var Save = function (data) { // JSON data, or parse object
        if (IsArray(data)) {
            return this.saveItems(data);
        }

        var self = this;
        return new Promise(function (resolve, reject) {
            if (self.primaryKeys.length > 0) {
                self.loadItem(data, 'id')
                    .then(resolve, reject);
            } else {
                return resolve();
            }
        })
            .then(function (item) {
                item = DataToItem(data, self.customClass, item);
                SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
                return item.save();
            })
    };

    var SaveItems = function (dataArray) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var items = [];
            if (self.primaryKeys.length > 0) {
                var promises = [], promise;
                for (var i = 0, cnt = dataArray.length; i < cnt; i++) {
                    let data = dataArray[i];
                    promise = self.loadItem(data, 'id')
                        .then(function (item) {
                            item = DataToItem(data, self.customClass, item);
                            SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
                            items.push(item);
                        });
                    promises.push(promise);
                }
                Promise.all(promises)
                    .then(function () {
                        return resolve(items);
                    })
                    .catch(reject);

            } else {
                for (var i = 0, cnt = dataArray.length; i < cnt; i++) {
                    var item = DataToItem(dataArray[i], self.customClass);
                    SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
                    items.push(item);
                }
                return resolve(items);
            }
        })
            .then(function (items) {
                return Parse.Object.saveAll(items);
            })
    };

    var GetItemCount = function (query) {
        if (query === undefined) {
            query = this.baseQuery;
        }
        return query.count();
    };

    class ItemTable {
        constructor(config) {
            this.pageLoader = new PageLoader();

            this.setClassName(GetValue(config, 'className', 'Item'));
            this.setItemCount(GetValue(config, 'itemCount', 100));
            this.setQuery();  // Reset to base query
            this.primaryKeys = [];
            var primaryKeys = GetValue(config, 'primaryKeys', undefined);
            if (primaryKeys) {
                this.setPrimaryKey(primaryKeys);
            }

            this.setOwnerReadMode(GetValue(config, 'ownerRead', undefined));
            this.setOwnerWriteMode(GetValue(config, 'ownerWrite', undefined));

        }

        setClassName(className) {
            this.customClass = Parse.Object.extend(className);
            return this;
        }

        setPrimaryKey(key) {
            if (!key) {
                this.primaryKeys.length = 0;
            } else if (typeof (key) === 'string') {
                this.primaryKeys.length = 1;
                this.primaryKeys[0] = key;
            } else {
                Copy(this.primaryKeys, key);
            }
            return this;
        }

        setOwnerReadMode(mode) {
            this.ownerRead = mode;
            return this;
        }

        setOwnerWriteMode(mode) {
            this.ownerWrite = mode;
            return this;
        }

        createItem() {
            return new this.customClass();
        }

        setItemCount(itemCount) {
            this.pageLoader.setItemCount(itemCount);
            return this;
        }

        setQuery(query) {
            if (query === undefined) {
                query = this.baseQuery;
            }
            this.pageLoader.setQuery(query);
            return this;
        }

        get baseQuery() {
            return new Parse.Query(this.customClass);
        }

        get startIndex() {
            return this.pageLoader.startIndex;
        }

        get pageIndex() {
            return this.pageLoader.pageIndex;
        }

        get isLastPage() {
            return this.pageLoader.isLastPage;
        }
    }

    var methods$2 = {
        getQuery: GetQuery,
        save: Save,
        saveItems: SaveItems,
        getItemCount: GetItemCount,
    };
    Object.assign(
        ItemTable.prototype,
        Methods$4,
        Methods$3,
        methods$2
    );

    ObjectFactory.register('itemTable', function (config) {
        return new ItemTable(config);
    });

    SetValue(window, 'RexPlugins.Parse.ItemTable', ItemTable);

    var IsPlainObject = function (obj)
    {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof(obj) !== 'object' || obj.nodeType || obj === obj.window)
        {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try
        {
            if (obj.constructor && !({}).hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'))
            {
                return false;
            }
        }
        catch (e)
        {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    };

    var GetTime = function (timeStamp) {
        var date = (timeStamp) ? (new Date(timeStamp)) : (new Date());
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var Jan1st = new Date(date.getFullYear(), 0, 1);
        var w = Math.ceil((((date - Jan1st) / 86400000) + Jan1st.getDay() + 1) / 7);
        return {
            d: `${y}-${m}-${d}`,
            w: `${y}-${w}`,
            m: `${y}-${m}`,
            y: `${y}`
        };
    };

    var TimeTagKeys = {
        d: 'tagD',
        w: 'tagW',
        m: 'tagM',
        y: 'tagY'
    };

    var ScoreKeys = {
        d: 'scoreD',
        w: 'scoreW',
        m: 'scoreM',
        y: 'scoreY'
    };

    var Post = function (score, extraData, timeStamp) {
        var newRecord = {
            userID: this.userID
        };
        if (this.boardID !== undefined) {
            newRecord.boardID = this.boardID;
        }
        if (this.userName) {
            newRecord.userName = this.userName;
        }
        var curTimeData = GetTime(timeStamp);
        if (this.timeFilters !== false) {
            for (var t in this.timeFilters) {
                if (!this.timeFilters[t]) {
                    continue;
                }
                newRecord[TimeTagKeys[t]] = curTimeData[t];
                newRecord[ScoreKeys[t]] = score;
            }
        } else { // No time filters
            newRecord.score = score;
        }
        if (this.tag) {
            newRecord.tag = this.tag;
        }
        if (extraData) {
            Object.assign(newRecord, extraData);
        }
        var curTimeData = GetTime();
        var self = this;
        return this.getMyRecordQuery().find()
            .then(function (results) {
                var prevRecord = results[0];
                if (prevRecord) {
                    if (self.timeFilters !== false) {
                        for (var t in self.timeFilters) {
                            if (!self.timeFilters[t]) {
                                continue;
                            }

                            var timeTagKey = TimeTagKeys[t];
                            if (prevRecord.get(timeTagKey) === newRecord[timeTagKey]) {
                                var scoreKey = ScoreKeys[t];
                                newRecord[scoreKey] = Math.max(prevRecord.get(scoreKey), newRecord[scoreKey]);
                            }
                        }
                    } else { // No time filters
                        newRecord.score = Math.max(prevRecord.get('score'), newRecord.score);
                    }
                }
                var item = DataToItem(newRecord, self.customClass, prevRecord);
                return item.save();
            });
    };

    var Methods$2 = {
        loadFirstPage() {
            this.resetPageQuery();

            var self = this;
            return this.page.loadFirstPage()
                .then(function (items) {
                    return Promise.resolve(ItemsToDataArray.call(self, items));
                })
        },

        loadNextPage() {
            this.resetPageQuery();

            var self = this;
            return this.page.loadNextPage()
                .then(function (items) {
                    return Promise.resolve(ItemsToDataArray.call(self, items));
                })
        },

        loadPreviousPage() {
            this.resetPageQuery();

            var self = this;
            return this.page.loadPreviousPage()
                .then(function (items) {
                    return Promise.resolve(ItemsToDataArray.call(self, items));
                })
        },

        loadCurrentPage() {
            this.resetPageQuery();

            var self = this;
            return this.page.loadCurrentPage()
                .then(function (items) {
                    return Promise.resolve(ItemsToDataArray.call(self, items));
                })
        },

        load(count, skip) {
            this.resetPageQuery();

            var self = this;
            return this.page.load(count, skip)
                .then(function (items) {
                    return Promise.resolve(ItemsToDataArray.call(self, items));
                })
        },

        resetPageQuery() {
            if (!this.resetQueryFlag) {
                return this;
            }

            this.resetQueryFlag = false;
            this.page.setQuery(this.getPageQuery());
            return this;
        }
    };

    var ItemsToDataArray = function (items) {
        var dataArray = [],
            data;

        var scoreKey = ScoreKeys[this.timeFilterType[0]];
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            data = items[i].toJSON();

            if (this.timeFilters !== false) {
                data.score = data[scoreKey];
                // Remove timeFilterKeys, and scoreKeys
                for (var t in this.timeFilters) {
                    delete data[TimeTagKeys[t]];
                    delete data[ScoreKeys[t]];
                }
            }
            dataArray.push(data);
        }
        return dataArray;
    };

    var GetScore = function (userID) {
        return this.getMyRecordQuery(userID).find()
            .then(function (results) {
                var myRecord = results[0];
                if (myRecord) {
                    myRecord = myRecord.toJSON();
                }
                return Promise.resolve(myRecord);
            });
    };

    var FindFirst = function (query, testCallback) {
        var out = {
            item: undefined,
            index: undefined
        };
        var startIndex = 0;
        return Query({
            query: query,
            forEachPageCallback: function (items) {
                var item;
                for (var i = 0, cnt = items.length; i < cnt; i++) {
                    item = items[i];
                    if (testCallback(item)) {
                        out.item = item;
                        out.index = startIndex + i;
                        return true;
                    }
                }
                startIndex += items.length;
            },
            resolveCallback: function () {
                return out;
            }
        });
    };

    var GetRank = function (userID) {
        if (userID === undefined) {
            userID = this.userID;
        }

        var query = this.getPageQuery();
        var testCallback = function (item) {
            return (item.get('userID') === userID);
        };
        return FindFirst(query, testCallback)
            .then(function (result) {
                return Promise.resolve({ userID: userID, rank: result.index });
            })
    };

    var Methods$1 = {
        deleteUser(userID) {
            if (userID === undefined) {
                userID = this.userID;
            }

            var query = this.getRecordQuery(undefined, undefined, userID, undefined);
            return Delete(query);
        },

        deleteBoard(boardId, tag) {
            if (boardId === undefined) {
                boardId = this.boardID;
            }
            if (tag === undefined) {
                tag = this.tag;
            }

            var query = this.getRecordQuery(boardId, tag, undefined, undefined);
            return Delete(query);
        }
    };

    var Methods = {
        getRecordQuery(boardID, customTag, userID, timeTagKey) {
            var query = this.baseQuery;
            query = (boardID !== undefined) ? query.equalTo('boardID', boardID) : query;
            query = (customTag !== undefined) ? query.equalTo('tag', customTag) : query;
            query = (userID !== undefined) ? query.equalTo('userID', userID) : query;

            if (timeTagKey !== undefined) {
                query = query.equalTo(timeTagKey[0], timeTagKey[1]);
            }
            return query;
        },

        getMyRecordQuery(userID) {        
            if (userID === undefined) {
                userID = this.userID;
            }
            return this.getRecordQuery(this.boardID, this.tag, userID, undefined).limit(1);
        },

        getPageQuery() {
            var timeTagKey, scoreKey;
            if (this.timeFilters !== false) {
                var t = this.timeFilterType[0];
                timeTagKey = [TimeTagKeys[t], GetTime()[t]];
                scoreKey = ScoreKeys[t];
            } else { // No time filters
                timeTagKey = undefined;
                scoreKey = 'score';
            }

            var query = this.getRecordQuery(this.boardID, this.tag, undefined, timeTagKey);
            query = query.descending(scoreKey);
            return query;
        }
    };

    class LeaderBoard {
        constructor(config) {
            this.setClassName(GetValue(config, 'className', 'Item'));

            this.userInfo = { userID: undefined, userName: undefined };
            this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', undefined));
            this.setBoardID(GetValue(config, 'boardID', undefined));
            this.setTag(GetValue(config, 'tag', undefined));
            this.setTimeFilters(GetValue(config, 'timeFilters', false));
            this.setTimeFilterType(GetValue(config, 'timeFilterType', 'year'));

            this.page = new PageLoader({
                itemCount: GetValue(config, 'pageItemCount', 100)
            });
            this.resetQueryFlag = true;
        }

        shutdown() {
        }

        destroy() {
            this.shutdown();
        }

        get userID() {
            return this.userInfo.userID;
        }

        set userID(value) {
            this.userInfo.userID = value;
        }

        get userName() {
            return this.userInfo.userName;
        }

        set userName(value) {
            this.userInfo.userName = value;
        }

        setClassName(className) {
            this.resetQueryFlag = true;
            this.customClass = Parse.Object.extend(className);
            return this;
        }

        setUser(userID, userName) {
            if (IsPlainObject(userID)) {
                this.userInfo = userID;
            } else {
                this.userID = userID;
                this.userName = userName;
            }
            return this;
        }

        setBoardID(boardID) {
            this.resetQueryFlag |= (this.boardID !== boardID);
            this.boardID = boardID;
            return this;
        }

        setTag(tag) {
            this.resetQueryFlag |= (this.tag !== tag);
            this.tag = tag;
            return this;
        }

        setTimeFilters(filters) {
            if (filters === false) {
                this.timeFilters = false;
            } else { // filters is true, or a plain object
                this.timeFilters = {
                    d: GetValue(filters, 'day', true),
                    w: GetValue(filters, 'week', true),
                    m: GetValue(filters, 'month', true),
                    y: GetValue(filters, 'year', true)
                };
            }
            return this;
        }

        setTimeFilterType(type) {
            this.resetQueryFlag |= (this.timeFilterType !== type);
            this.timeFilterType = type;
            return this;
        }

        setPageItemCount(count) {
            this.page.setItemCount(count);
            return this;
        }

        get baseQuery() {
            return new Parse.Query(this.customClass);
        }

        get pageIndex() {
            return this.page.pageIndex;
        }

        get isFirstPage() {
            return (this.page.pageIndex === 0);
        }

        get isLastPage() {
            return (this.page.isFullPage === false);
        }
    }

    var methods$1 = {
        post: Post,
        getScore: GetScore,
        getRank: GetRank
    };

    Object.assign(
        LeaderBoard.prototype,
        methods$1,
        Methods,
        Methods$2,
        Methods$1
    );

    ObjectFactory.register('leaderBoard', function (config) {
        return new LeaderBoard(config);
    });

    SetValue(window, 'RexPlugins.Parse.Leaderboard', LeaderBoard);

    var QuickLogin = function (userName, password) {
        return Parse.User.logOut() // // Log-out first
            .then(function () {
                return Parse.User.logIn(userName, password); // Try login
            })
            .catch(function () {  // Login fail, try sign-up, then login again
                return SignUpThenLogin(userName, password);
            })
    };

    var SignUpThenLogin = function (userName, password) {
        var user = new Parse.User();
        user
            .set('username', userName)
            .set('password', password);

        return user.signUp()
            .then(function () {  // Sign up success, try login again                        
                return Parse.User.logIn(userName, password);
            })
    };

    class ParsePlugin {
        constructor() {
            this.add = new ObjectFactory();
        }

        preload(url) {
            return Preload(url);
        }
    }

    var methods = {
        quickLogin: QuickLogin
    };
    Object.assign(
        ParsePlugin.prototype,
        methods
    );

    return ParsePlugin;

}));
