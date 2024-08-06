  class ErrorHandler{
    
    constructor(code, message){
            this.code = code;
            this.message = message;
    }

    static validationError(message){
       return new ErrorHandler(400,message);
    }
   
    static unAuthorizedError(message){
      return new ErrorHandler(401,message);
    }

    static forbiddenError(message){
      return new ErrorHandler(403,message);
    }

    static notFoundError(message){
      return new ErrorHandler(404,message);
    }

    static internalServerError(message){
      return new ErrorHandler(500,message);
    }
}

export default ErrorHandler;