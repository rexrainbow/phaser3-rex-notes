import localforage from 'localforage';

localforage.setItem('key0', 'abc')
    .then(function () {
        return localforage.getItem('key0');
    })
    .then(function (value) {
        console.log(`Get value= ${value}`);
        return Promise.resolve();
    })
    .then(function () {
        console.log('Remove key')
        return localforage.removeItem('key0');
    })
    .then(function () {
        return localforage.getItem('key0');
    })
    .then(function (value) {
        console.log(`Get value= ${value}`);
        return Promise.resolve();
    })
    .then(function () {
        console.log('Remove key again')
        return localforage.removeItem('key0');
    })
    .catch(function (err) {
        console.log(err);
    })