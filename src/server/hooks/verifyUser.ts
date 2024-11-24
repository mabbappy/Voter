import { cookies, headers } from "next/headers";
import { pool } from "../models/db";
import genQuerySelectSql from "../mysql_gen/genQuerySelectSql";
import decodedTokenJWT from "../utils/decodedTokenJWT";
import wrappedCryptoToken from "../utils/wrappedCryptoToken";

export const verifyUser = async () => {
    const get_headers = headers()
    const ref_tkn = cookies().get('ref_tkn')?.value || headers().get('ref_tkn')
    try {
        const tokenDecode: any = decodedTokenJWT({
            token: ref_tkn,
            tokenSecret: process.env.ADMIN_REFRESH_TOKEN
        });
        if (tokenDecode.success) {
            const { email, sessionToken, role, uvc } = tokenDecode?.data

            const getSalt = sessionToken?.split('####')?.[0];
            const getHash = sessionToken?.split('####')?.[1];

            const promisePool = pool.promise();
            let sql = ''
            if (email) {
                // ?admin
                sql = genQuerySelectSql({
                    table: 'eco',
                    condition: `email = ${JSON.stringify(email)}`
                })
            }
            else {
                sql = genQuerySelectSql({
                    table: 'voter',
                    condition: `UVC = ${JSON.stringify(uvc)}`
                })
            }

            try {
                const [rows, fields]: any = await promisePool.query(sql);
                const hashedPass = rows?.[0]?.hashedPass;
                const checkPass = wrappedCryptoToken({
                    salt: getSalt,
                    wrappedCryptoString: hashedPass
                }).hash == getHash;

                if (checkPass) {
                    return {
                        role: rows?.[0]?.role,
                        check: true,
                        email: rows?.[0]?.email,
                        uvc: uvc
                    }
                }
                else {
                    return {
                        role: null,
                        check: false,
                        email: null
                    }
                }

            }
            catch (err) {
                return {
                    role: null,
                    check: false,
                    email: null
                }
            }

        }
        else {
            return {
                role: null,
                check: false,
                email: null
            }
        }

    }
    catch {
        return {
            role: null,
            check: false,
            email: null
        }
    }
}