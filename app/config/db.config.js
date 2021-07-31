module.exports = {
    url: `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASS}@cluster0.imqr6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
};