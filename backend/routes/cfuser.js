const CFuserdata = require("../models/codeForcesUser")
const express = require("express")

const router = express.Router();

const AddData = async (usernames) => {
    try {
        for (const user of usernames) {
            // Check if the user already exists in the database
            const exists = await CFuserdata.findOne({ username: user.username });
            if (!exists) {
                // Insert the user if they don't already exist
                await CFuserdata.create(user);
            } else {
                // console.log(`Duplicate user skipped: ${user.username}`);
            }
        }
        console.log("All codeforces user successfully processed");
    } catch (error) {
        console.log("Unable to add codeforces user:", error.message);
    }
};

router.post("/add", async (req,res) => {
    const {username} = req.body
    try {
        const usernames = [
            {username},
        ]
        await AddData(usernames)
        res.status(200).json({
            message: "codeforces username successfully added"
        })
    } catch (error) {
        console.log("unable to add codeforces username",error)
    }
    
})

module.exports = router