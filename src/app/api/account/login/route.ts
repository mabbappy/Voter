import { pool } from "@/server/models/db";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import refreshTokenEncodedCrypto from "@/server/utils/refreshTokenEncodedCrypto";
import wrappedCryptoToken from "@/server/utils/wrappedCryptoToken";
import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    try {
        const { password, uvc } = body
        const email = body?.email?.toLowerCase();

        let selectSql = ''

        if (email) {
            selectSql = genQuerySelectSql({
                table: 'eco',
                condition: `email = ${JSON.stringify(email)}`
            })
        }
        else {
            selectSql = genQuerySelectSql({
                table: 'voter',
                condition: `UVC = ${JSON.stringify(uvc)}`
            })
        }


        const promisePool = pool.promise();
        try {
            const [rows, fields]: any = await promisePool.execute(selectSql);
            const userPass = rows?.[0];
            if (!userPass) {
                return res.json({ success: false, message: "Could not find account" })
            }
            else {
                const { hashedPass, salt, role } = userPass;

                const checkPass = wrappedCryptoToken({
                    salt: salt,
                    wrappedCryptoString: password
                }).hash == hashedPass;

                if (checkPass) {

                    const getRefreshToken: any = refreshTokenEncodedCrypto({
                        uvc: uvc,
                        email: email,
                        hashedPass: hashedPass,
                        role: email ? "eco" : 'voter'
                    })

                    await cookies().set('ref_tkn', getRefreshToken)
                    return res.json({
                        success: true,
                        token: getRefreshToken
                    })
                }
                else {
                    return res.json({
                        success: false,
                        message: 'Password does not match.'
                    })
                }
            }

        }
        catch (err) {
            return res.json({ success: false, message: "Something is wrong" })
        }

    }
    catch (err) {
        return res.json({ success: false, message: "Something is wrong", err: err })
    }
}