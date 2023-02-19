## Introduction

i18next is a very popular internationalization framework for browser or any other javascript environment.

- Author: [i18next](https://github.com/i18next/i18next)

## Usage

### Import class

- Install i18next from npm
    ```
    npm i i18next
    ```
- Import i18next
    ```javascript
    import i18next from 'i18next';
    ```
- Initialize
    ```javascript
    i18next.init(config);
    ```
- Translation
    ```javascript
    var result = i18next.t(key);
    ```


### Initialize

```javascript
i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
        fallbackLng: "en",
        en: {
            translation: {
                key: value
            }
        }
    }
})
```

### Add translations

- Add translations data at initialize
    ```javascript
    i18next.init({
        // ...
        resources: {
            en: {
                translation: {
                    key: value
                }
            }
        }
    })
    ```
- Add translations data
    ```javascript
    i18next.addResources(lng, ns, {
        key: value
    })
    ```
    - `ns` : Default namespace is `"translation"`.
- Load 

### Change language

```javascript
i18next.changeLanguage("en");
```

Fire event `'languageChanged'`.

### Translate

```javascript
var result = i18next.t(key);
// var result = i18next.t(key, { ns: 'translation' });
```

Default namespace is `'translation'`.

### Events

- On language changed, triggered by `i18next.changeLanguage(lng)`.
    ```javascript
    i18next.on('languageChanged', function (lng) {
    });
    ```