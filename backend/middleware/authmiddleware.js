import jwt from 'jsonwebtoken';

const authorizeUser = (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({
            success: false,
            message: "Access denied, no token found."
        })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        req.body.user_id = decodeToken.id;

        next();
    } catch (error) {

        return res.json({
            success: false,
            message: error.message
        })
    }
}


export { authorizeUser };