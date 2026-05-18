importScripts('https://unpkg.com/comlink/dist/umd/comlink.js');
(() => {
    async function run(data, onBefore, onEnd) {
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

        if (onEnd) {
            newData = await onEnd(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        return data;
    }

    Comlink.expose(run);
})();