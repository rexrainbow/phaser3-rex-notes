const DefaultWorker = `\
importScripts('https://unpkg.com/comlink/dist/umd/comlink.js');
(() => {
    async function run(data?: any, onBefore?: any, onAfter?: any) {
        var newData;
        if (onBefore?: any) {
            newData = await onBefore(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (onAfter?: any) {
            newData = await onAfter(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        return data;
    }
    Comlink.expose(run);
})();\
`;

export default DefaultWorker;