const parseIsFavourite = (isFavourite) => {
    if (typeof isFavourite !=='string') return undefined;
    try {
        const parsed = JSON.parse(isFavourite);
        if (typeof parsed === 'boolean') {
            return parsed;
        }
    } catch  {
        return undefined;
    }
};

const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) =>
        ['work', 'home', 'personal'].includes(contactType);
    if (isContactType(contactType)) return contactType;
};


export const parseFilterParams = (query) => {
    const { isFavourite, contactType } = query;

    const parsedIsFavourite = parseIsFavourite(isFavourite);
    const parsedContactType = parseContactType(contactType);

    return {
        isFavourite: parsedIsFavourite,
        contactType: parsedContactType,
    };
};