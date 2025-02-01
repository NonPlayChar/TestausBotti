const mariadb = require("mariadb")
const { maria } = require("../config.json")

let connection;

async function connect() {
    try {
        connection = await mariadb.createConnection(maria)
        console.log("Connected to Testauskoira database")
    } catch (err){
        console.warn("Testauskoira database connection failed\n", err)
    }
}

function getConnection() {
    return connection;
}

module.exports = {
    getConnection,
    connection,
    connect
}