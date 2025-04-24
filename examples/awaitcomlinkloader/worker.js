// import * as Comlink from 'comlink'
importScripts('../../assets/comlink/comlink.js');

(() => {
    var obj = {
        async run(payload) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve({ a: payload.a + 10, b: payload.b + 20 })
                }, 1000);
            });
        }
    };

    Comlink.expose(obj);
})();