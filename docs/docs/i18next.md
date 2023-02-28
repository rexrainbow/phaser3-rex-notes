## Introduction

i18next is a very popular internationalization framework for browser or any other javascript environment.

- Author: [i18next](https://github.com/i18next/i18next)

## Usage

### Import class

- Install i18next, i18next-http-backend from npm
    ```
    npm i i18next
    npm i i18next-http-backend
    ```
- Import i18next
    ```javascript
    import i18next from 'i18next';
    import Backend from 'i18next-http-backend';
    ```
- Initialize
    ```javascript
    i18next.use(Backend).init(config);
    ```
- Translation
    ```javascript
    var result = i18next.t(key);
    ```


### Initialize

```javascript
i18next
    .use(Backend)
    .init({
        lng: 'dev',
        ns: 'translation',
    
        // resources: {
        //     'dev': {
        //         'translation': {
        //             key: value,  
        //         }
        //     }
        // }
    
        // debug: true,
    })
```

- `lng` : Language to use. Will fallback to `'dev'`.
- `ns` : String or array of namespaces to load. Default value is `'translation'`.
- `debug` : Logs info level to console output. Helps finding issues with loading not working. Default value is `false`.
- `resources` : Resources to initialize with.
- `backend.loadPath` : Path where resources get loaded from, or a function returning a path.
    ```javascript
    function(lngs, namespaces) { 
        return customPath; 
    }
    ```
- `backend.parse` : Parse data after it has been fetched. Optional.
    ```javascript
    function(data) { 
        return JSON.parse(data); 
    }
    ```

See also [Configuration Options](https://www.i18next.com/overview/configuration-options), and [Backend Options](https://github.com/i18next/i18next-http-backend#backend-options)

### Change language

```javascript
i18next.changeLanguage("en");
```

Fire event `'languageChanged'`.

### Translate

```javascript
var result = i18next.t(key);
// var result = i18next.t(key, interpolation);
```

### Events

- On language changed, triggered by `i18next.changeLanguage(lng)`.
    ```javascript
    i18next.on('languageChanged', function (lng) {
    });
    ```