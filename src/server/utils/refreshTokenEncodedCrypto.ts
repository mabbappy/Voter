
import wrappedCryptoToken from './wrappedCryptoToken'
import generateTokenJWT from './generateTokenJWT'

export default function refreshTokenEncodedCrypto({
    email, hashedPass, role = "user", uvc
}: {
    email?: string | any, hashedPass?: any, role?: any,
    uvc?: string
}) {
    // (B1) GENERATE RANDOM SALT
    const { hash, salt } = wrappedCryptoToken({
        wrappedCryptoString: hashedPass
    })

    const refreshToken = {
        email: email,
        sessionToken: `${salt}####${hash}`,
        role: role,
        uvc: uvc
    }

    const refreshTokenGen = generateTokenJWT({
        data: refreshToken,
        expiresIn: (role == 'user' ? '7 days' : '3 days'),
        tokenSecret: process.env.ADMIN_REFRESH_TOKEN
    }).token
    return refreshTokenGen
}


