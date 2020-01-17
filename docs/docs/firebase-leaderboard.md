## Introduction

Descending sort scores, using [firebase-firestore](https://firebase.google.com/docs/firestore/).

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/firebase-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/dist/rexfirebaseplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-leaderboard)

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import FirebasePlugin from './plugins/firebase-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexFire',
            plugin: FirebasePlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Import SDK

*Firebase SDK dose not boundle into this plugin*

- Download SDK from [CDN](https://firebase.google.com/docs/web/setup/#libraries-cdn) via script tags.
    - Firebase core
    - Firebase-database
- Download SDK during preload stage.
    ```javascript
    scene.plugins.get('rexFire').preload(scene);    
    ```

### Create instance

1. Initialize firebase application.
    ```javascript
    var rexFire = scene.plugins.get('rexFire').initializeApp({
       apiKey: '...',
       authDomain: '...',
       databaseURL: '...',
       projectId: '...',
       storageBucket: '...',
       messagingSenderId: '...'
    });
    ```
2. Create leader board instance.
    ```javascript
    var leaderBoard = rexFire.add.leaderBoard({
        root: '',
        // timeFilters: false,
        // timeFilterType: 'year',
        // pageItemCount: 100,
        // boardID: undefined,
        // tag: undefined
    });
    ```
    - `root` : Collection name of this leaderboard.
    - `timeFilters` : Time filter of day/week/month/year.
        - `false` : Don't use any time filter.
        - `true` : Enable all time filters.
        - JSON object, enable some time filters.
            ```javascript
            {
                day: true,
                week: true,
                month: true,
                year: true
            }
            ```
    - `timeFilterType` : Type of time filter.
        - `'day'`, or `'d'` : Filter scores by current day.
        - `'week'`, or `'w'` : Filter scores by current week. 
        - `'month'`, `'m'` : Filter scores by current month.
        - `'year'`, `'y'` : Filter scores by current year. Default value.
    - `pageItemCount` : Item count of a page, default value is `100`
    - `boardID` : Board ID, optional.
    - `tag` : Custom tag, optional.

!!! note "Time filter enabled"
    Add [indexes](https://firebase.google.com/docs/firestore/query-data/indexing) if time filter is enabled.  
    - `tagD`(ascending), `scoreD`(descending), `boardID`(ascending), `tag`(ascending)  
    - `tagW`(ascending), `scoreW`(descending), `boardID`(ascending), `tag`(ascending)  
    - `tagM`(ascending), `scoreM`(descending), `boardID`(ascending), `tag`(ascending)  
    - `tagY`(ascending), `scoreY`(descending), `boardID`(ascending), `tag`(ascending)

### Post score

1. Set user.
    ```javascript
    leaderBoard.setUser(userID, userName);
    ```
    or
    ```javascript
    leaderBoard.setUser({
        userID: userID,
        userName: userName
    });
    ```
    - `userID` : User ID.
    - `userName` : Display name of user, optional.
1. Set board property, optional.
    - Board ID
        ```javascript
        leaderBoard.setBoardID(boardID);
        ```
    - Custom tag
        ```javascript
        leaderBoard.setTag(tag);
        ```
1. Post score
    ```javascript
    leaderBoard.post(score)
    // leaderBoard.post(score, extraData)
    // leaderBoard.post(score, extraData, timestamp)
        .then(function(record) { })
        .catch(function(error) { })
    ```
    - `score` : A number, scores will be sorted descend.
    - `extraData` : Extra data in JSON format.
    - `timestamp` : Timestamp of posting.
        - `undefined` : Current time.
        - A number : For debug usage

### Get my score

```javascript
leaderBoard.getScore()
// leaderBoard.getScore(userID)
    .then(function(score) { })
    .catch(function(error) { })
```

- `userID` : User ID, optional.
    - `undefined` : Current user ID.
- `score` : Score object.
    - Time filter enabled :  `{userID, scoreD, scoreW, scoreM, scoreY, tagD, tagW, tagM, tagY}`
        - `scoreD`, `scoreW`, `scoreM`, `scoreY` : Score of day/week/month/year.
        - `tagD`, `tagW`, `tagM`, `tagY` : Time tag of day/week/month/year.
    - Time filter disabled : `{userID, score}`

### Get my rank

```javascript
leaderBoard.getRank()
// leaderBoard.getRank(userID)
    .then(function(rank) { })
    .catch(function(error) { })
```

- `userID` : User ID, optional.
    - `undefined` : Current user ID.
- `rank` : Rank object. `{userID, rank}`

### Get scores

1. Set board property, optional.
    - Board ID
        ```javascript
        leaderBoard.setBoardID(boardID);
        ```
    - Custom tag
        ```javascript
        leaderBoard.setTag(tag);
        ```
1. Set time filter, optional.
    ```javascript
    leaderBoard.setTimeFilterType(type);    
    ```
    - `type` : 
        - `'day'`, or `'d'` : Filter scores by current day.
        - `'week'`, or `'w'` : Filter scores by current week. 
        - `'month'`, `'m'` : Filter scores by current month.
        - `'year'`, `'y'` : Filter scores by current year.
1. Load scores page by page.
    - Load first page.
        ```javascript
        leaderBoard.loadFirstPage()
            .then(function(scores) { })
            .catch(function(error) { })
        ```
        - `scores` : An array of score object. Each score object is `{userID, userName, socre}`
    - Load next page.
        ```javascript
        leaderBoard.loadNextPage()
            .then(function(scores) { })
            .catch(function(error) { })
        ```
        - `scores` : An array of score object. Each score object is `{userID, userName, socre}`
    - Load previous page.
        ```javascript
        leaderBoard.loadPreviousPage()
            .then(function(scores) { })
            .catch(function(error) { })
        ```
        - `scores` : An array of score object. Each score object is `{userID, userName, socre}`
    - Reload current page.
        ```javascript
        leaderBoard.loadCurrentPage()
            .then(function(scores) { })
            .catch(function(error) { })
        ```
        - `scores` : An array of score object. Each score object is `{userID, userName, socre}`

#### Page index

- Current page index
    ```javascript
    var pageIndex = leaderBoard.pageIndex;
    ```
- Is first page
    ```javascript
    var isFirstPage = leaderBoard.isFirstPage;
    ```
- Is last page
    ```javascript
    var isLastPage = leaderBoard.isLastPage;
    ```

### Delete

- Delete user
    ```javascript
    leaderBoard.deleteUserScore(userID)
        .then(function(){ })
        .catch(function(){ })
    ```
- Delete board
    ```javascript
    leaderBoard.deleteBoard(boardID, tag)
        .then(function(){ })
        .catch(function(){ })    
    ```