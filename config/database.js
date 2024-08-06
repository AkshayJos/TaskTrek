import mongoose from 'mongoose';

export const Connection = async (URL) =>{
    try{
        await mongoose.connect(URL);
        console.log("Database Connected...")
    }
    catch(error){
            console.log("Error While connecting with the database : ", error);
    }
}

export default Connection;