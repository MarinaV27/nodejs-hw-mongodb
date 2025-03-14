const parseIsFavourite = (isFavourite) => {
    if (typeof isFavourite === "boolean") return isFavourite; // Если уже boolean
    if (typeof isFavourite !== "string") return undefined; // Пропускаем другие типы

    const lowerCaseValue = isFavourite.toLowerCase(); // Приводим к нижнему регистру
    if (lowerCaseValue === "true") return true;
    if (lowerCaseValue === "false") return false;
    
    return undefined; // Если передано некорректное значение
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