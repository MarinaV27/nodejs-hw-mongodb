import { HttpError } from 'http-errors';


export const errorHandler = (err, req, res, next) => {
	// Перевірка, чи отримали ми помилку від createHttpError

	if (err instanceof HttpError) {
		res.status(err.status).json({
			status: err.status,
			data: err,
		});
		return;
	}
	
	
	res.status(500).json({
		status: 500,
		message: 'Something went wrong',
		data: err.message,
	});
};










//{
//		status: 500,
//		message: "Something went wrong",
//		data: 
//		// конкретне повідомлення про помилку, отримане з об'єкта помилки
//}