
export const notFoundHandler = (res, req, next) => {
    res.status(404).json({
        status: 404,
        message: 'Route not found',
    });
};