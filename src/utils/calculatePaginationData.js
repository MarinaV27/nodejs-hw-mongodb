import { date } from "joi";

export const calculatePaginationData = (count, perPage, page) => {
    const totalPages = Math.ceil(count / perPage);
    const hasNexPage = Boolean(totalPages - page);
    const hasPreviousPage = page !== 1;

    return {
        date,
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasPreviousPage,
        hasNexPage,

    };
};