export const StringType = 0;
export const RegexType = 1;

export const Level2HeadingCommandTypes = [
    {
        name: 'condition',
        type: StringType
    },
    {
        name: 'catch',
        type: StringType
    },
];

export const Level3HeadingCommandTypes = [
    {
        name: 'if',
        type: StringType
    },
    {
        name: 'else',
        type: StringType
    },
    {
        name: 'while',
        type: StringType
    },
];

export const ActionCommandTypes = [
    {
        name: 'exit',
        type: StringType
    },
    {
        name: 'break',
        type: StringType
    },
    {
        name: 'next round',
        type: StringType
    },
    {
        name: 'deactivate',
        type: StringType
    },
];