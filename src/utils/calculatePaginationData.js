
export const calculatePaginationData = ({count, perPage, page}) => {
    const totalPages = Math.ceil(count / perPage);
    const hasNexPage = Boolean(page < totalPages);
    const hasPreviousPage = page !== 1;

    return {
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasPreviousPage,
        hasNexPage,

    };
};