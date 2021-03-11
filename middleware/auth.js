import jwt from 'jsonwebtoken';

// WHAT DOES MIDDLEWARE DO?
// 1. a request is called (ex: liking a post)
// 2. auth middleware determines 'next' if user is authorized (using jwt's)
// 3. controller is activated (allows process to occur)

// 'next' means to do something then move on
const auth = async (req, res, next) => {
    try {
        // get token from frontend (api folder)
        const token = req.headers.authorization.split(" ")[1];

        // checks if token is custom or from Google Auth
        const isCustomAuth = token.length < 500;

        // var for data from token
        let decodedData;

        // if token exists and is custom, decode data and set to variable
        // second argument use same 'secret string' from usersController
        if (token && isCustomAuth) {
            // set variable equal to user data 
            decodedData = jwt.verify(token, 'test');

            // req.userId = decodedData?.id;
            req.userId = decodedData.id;
        } else {
            decodedData = jwt.decode(token);

            // 'sub' is Google's name for specific google user id
            // req.userId = decodedData?.sub;
            req.userId = decodedData.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;