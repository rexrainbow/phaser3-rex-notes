importScripts('../../assets/comlink/comlink.js');
(() => {
    var obj = {
        async run(data, onBefore, onAfter) {
            var newData;
            if (onBefore) {
                newData = await onBefore(data);
                if (newData !== undefined) {
                    data = newData;
                }
            }

            console.log('onWorker');
            await new Promise(function (resolve, reject) {
                setTimeout(resolve, 1000);
            });

            data.a += 10;
            data.b += 20;

            if (onAfter) {
                newData = await onAfter(data);
                if (newData !== undefined) {
                    data = newData;
                }
            }

            return data;
        }
    }

    Comlink.expose(obj);
})();