import ClaimsModel from "../models/models.Claims.js";

export const putClaim = async (req, res) => {
    try {

        const data = await ClaimsModel.findOneAndUpdate({ _id: req.params.id }, req.body,)
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error });
    }
}


export const putAttachment = async (req, res) => {

    try {
        console.log(req.body);
        const updatedClaim = await ClaimsModel.findOneAndUpdate(
            { _id: req.params.id }, // find the document by _id
            { $push: { attachments: { $each: req.body.attachments } } },
            { new: true } // return the updated document
        );
        console.log(updatedClaim);
        res.send(updatedClaim);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
