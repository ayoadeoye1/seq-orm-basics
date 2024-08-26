const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { sequelize } = require("./models");
const router = require("./routes");

const app = express()

app.use(express.json())

const dropAndSync = async () => {
    try {
        // await sequelize.drop()
        await sequelize.sync({ alter: true });
        // await sequelize.sync({force: true});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const databaseConnection = async () => {
    try {
        // await dropAndSync()
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

databaseConnection();


const databaseConnectionShut = async () => {
    try {
        await sequelize.close()
        console.log('Sequelize connection closed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Could not disconnect DB', error);
        process.exit(1);
    }
}

process.on("SIGINT", databaseConnectionShut)
process.on("SIGTERM", databaseConnectionShut)

app.use("/api", router)

app.listen(process.env.PORT, () => {
    console.log(`Server Running On: http://localhost:${process.env.PORT}`)
})
