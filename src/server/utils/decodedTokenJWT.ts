import jwt from 'jsonwebtoken'
export default function decodedTokenJWT(
    {
        tokenSecret = process.env.TOKEN_SECRET,
        token
    }: {
        tokenSecret?: string | any,
        token?: string | any
    }
) {
    try {
        return { data: jwt.verify(token, tokenSecret), success: true }
    }
    catch (err: any) {
        return { data: null, success: false, message: err.message }
    }
}
