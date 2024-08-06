import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ErrorHandler from '../errorHandler/errorHandler.js';
import Token from '../models/token.js';

dotenv.config();

export const authenticateToken = (req,res,next) =>{
    const authHeader =  req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
       next(ErrorHandler.unAuthorizedError('token is missing !!'));
       return;
    }

        jwt.verify(token,process.env.ACCESS_SECRET_KEY, (error, user)=>{
            if(error){
               next(ErrorHandler.forbiddenError('Invalid token !!'));
               return;
            }
            req.user = user;
            next();
    });
}

export const authenticate = (req,res,next) =>{
    
    const token = req.params.token;
    if(token == null){
       next(ErrorHandler.unAuthorizedError('token is missing !!'));
       return;
    } 

        jwt.verify(token,process.env.ACCESS_SECRET_KEY, (error, user)=>{
            if(error){
               next(ErrorHandler.forbiddenError('Invalid token !!'));
               return;
            }
            res.status(200).json(user);
    });
}

export const getValidate = (req,res,next) =>{
    const refreshToken = req.params.refreshToken.split(' ')[1];
    if(refreshToken == null){
        next(ErrorHandler.unAuthorizedError('token is missing !!'));
        return;
     }
 
         jwt.verify(refreshToken,process.env.REFRESH_SECRET_KEY, async(error, user)=>{
             if(error){
                next(ErrorHandler.forbiddenError('Invalid token !!'));
                return;
             }

             const newAccessToken = jwt.sign(
                user,
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: "24h" }
              );
              const newRefreshToken = jwt.sign(
                user,
                process.env.REFRESH_SECRET_KEY,
              );
        
              const newToken = new Token({ token: newRefreshToken });
              await newToken.save();
        
              res
                .status(200)
                .json({
                  accessToken: newAccessToken,
                  refreshToken: newRefreshToken,
                });
     });
}