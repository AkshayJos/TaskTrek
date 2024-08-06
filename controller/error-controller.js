import ErrorHandler from "../errorHandler/errorHandler.js"

export const errorController = (error, req, res, next) =>{
    if(error instanceof ErrorHandler){
        return res.status(error.code).json(error.message);
    }
}
