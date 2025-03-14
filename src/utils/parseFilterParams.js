const parseIsFavorite = (isFavorite) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isBool = typeof JSON.parse(isString) === 'boolean';
    if (!isBool) return;
    return JSON.parse(isFavorite);
};

const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) =>
        ['work', 'home', 'personal'].includes(contactType);
    if (isContactType(contactType)) return contactType;
};


export const parseFilterParams = (query) => {
    const { isFavorite, contactType } = query;

    const parsedIsFavorite = parseIsFavorite(isFavorite);
    const parsedContactType = parseContactType(contactType);

    return {
        isFavorite: parsedIsFavorite,
        contactType: parsedContactType,
    };
};