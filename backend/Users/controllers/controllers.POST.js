import UserModel from "../models/models.User.js";

export const postUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        console.log(user);
        res.status(201).json( user );
    } catch (error) {
        res.status(400).json({ error });
    }
}



