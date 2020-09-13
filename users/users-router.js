const express = require("express")
const Users = require("./users-model")

const router = express.Router()

router.get("/users", async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})

// create user
router.post("/users", async (req, res, next) => {
    try {
        const user = await Users.add(req.body)
        res.status(201).json(user)
    } catch(err) {
        next(err)
    }
})

// delete user
router.delete("/users/:id", (req, res, next) => {
    Users.remove(req.params.id)
    .then((count) => {
        if (count > 0 ) {
            res.status(200).json({
                message: "User has been deleted"
            })
        }
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router