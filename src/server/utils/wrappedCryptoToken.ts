import crypto from 'crypto'
let length = 16;

export default function wrappedCryptoToken({
    salt = crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length),
    wrappedCryptoString = ''
}: {
    salt?: any,
    wrappedCryptoString?: any
}) {
    try {
        // (B2) SHA512 HASH
        let hash = crypto.createHmac("sha512", salt);
        hash.update(wrappedCryptoString);
        return {
            salt: salt,
            success: true,
            hash: hash.digest("base64")
        }
    }
    catch (err: any) {
        return {
            success: false,
            salt: null,
            hash: null,
            message: err.message
        }
    }
};

