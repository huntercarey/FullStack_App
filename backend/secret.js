const secrets = {
    //The URL that we use to connect to the MongoDB Atlas Cluster
    dbUrl:'mongodb+srv://huntercarey:12cicks12@cluster0-mj3ow.mongodb.net/test?retryWrites=true&w=majority'
};

const getSecret = key => secrets[key];

module.exports = getSecret;