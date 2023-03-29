import { ApiError } from "../error/apiError.js";
export default function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, status: err.status });
    }
    return res.status(500).json({ message: "Непредвиденная ошибка!", status: err.status });
}
//# sourceMappingURL=ErrorHandlingMiddleware.js.map