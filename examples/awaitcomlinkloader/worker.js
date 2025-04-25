importScripts('../../assets/comlink/comlink.js');
(() => {
    async function run(data, onBefore, onAfter) {
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

    Comlink.expose(run);
})();