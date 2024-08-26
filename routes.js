const express = require("express")
const { User }= require("./models")
const { Product }= require("./models")

const router = express.Router()

router.post("/users/create", async (req, res) => {
    try {
        const { username, email, role, password, confirm_password, age } = req.body

        if(password !== confirm_password) {
            return res.status(400).json("passwords does not match")
        }

        const user = await User.create({
            username,
            email,
            role,
            password,
            age
        })
        
        return res.status(200).json({
            status: true,
            data: user,
            message: "user created"
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get("/users/all", async (req, res) => {
    try {
        const user = await User.findAll({})
        
        return res.status(200).json({
            status: true,
            data: user,
            message: "users list"
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get("/users/one/:uuid", async (req, res) => {
    try {
        const uuid = req.params.uuid
        const user = await User.findOne({
            where: {
                uuid
            }
        })
        
        return res.status(200).json({
            status: true,
            data: user,
            message: "user by uuid"
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.post("/product/create/:id", async (req, res) => {
    try {
        const sellerUuid = req.params.id
        const { title, description, price } = req.body

        if(!title || !description || !price) {
            return res.status(400).json("all input are required")
        }

        const seller = await User.findOne({ where: { uuid: sellerUuid }})
        
        const product = await Product.create({title, description, price, sellerId: seller.id})
        product.sellerId = undefined

        return res.status(200).json({
            status: true,
            data: product,
            message: "product added successfully"
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get("/product/all", async (req, res) => {
    try {
        const product = await Product.findAll({})

        return res.status(200).json({
            status: true,
            data: product,
            message: "product all"
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get("/product/one/:id", async (req, res) => {
    try {
        const prodUuid = req.params.id
        const product = await Product.findOne({ where: { uuid: prodUuid }})

        return res.status(200).json({
            status: true,
            data: product,
            message: "product one"
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router