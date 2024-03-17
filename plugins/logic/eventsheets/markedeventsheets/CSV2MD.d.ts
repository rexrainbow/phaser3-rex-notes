export default CSV2MD;

declare function CSV2MD(csvString: string): string;

declare function CSV2MD(csvString: string, title: string): string;

declare function CSV2MD(
    csvString: string,
    config: {
        title: string
    }
): string;