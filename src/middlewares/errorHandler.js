export const errorHandler = (err, req, res, next) => {
	res.status(500).json({
		message: 'Something went wrong',
		error: err.message,
	});
};










//{
//		status: 500,
//		message: "Something went wrong",
//		data: 
//		// конкретне повідомлення про помилку, отримане з об'єкта помилки
//}