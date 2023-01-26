import UserModel from "../models/models.User.js";

export const getUser = async (req, res) => {
    try {
        
        const users = await UserModel.find({_id:req.params.id,...req.query}).populate("Policy_ID");
       console.log(users);
        res.status(200).json( users );
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({...req.query}).populate("Policy_ID");
        
        console.log(users);
        res.status(200).json( users );
    } catch (error) {
        
        res.status(400).json({ error });
    }
}


