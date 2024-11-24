import jwt from 'jsonwebtoken'

export default function generateTokenJWT({ data = {}, tokenSecret = process.env.TOKEN_SECRET, expiresIn = '24h' }: {
    data: any, tokenSecret?: any, expiresIn?: any
}) {
    try {
        return { token: jwt.sign(data, tokenSecret, { expiresIn: expiresIn, algorithm: 'HS256' }), success: true }
    }
    catch (err: any) {
        return { token: null, success: false, message: err.message }
    }
}