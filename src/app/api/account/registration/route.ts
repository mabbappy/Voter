import { pool } from "@/server/models/db";
import genQueryInsertSql from "@/server/mysql_gen/genQueryInsertSql";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";

import refreshTokenEncodedCrypto from "@/server/utils/refreshTokenEncodedCrypto";
import wrappedCryptoToken from "@/server/utils/wrappedCryptoToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse as res } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { password, name, dob, uvc, constituency_id } = body
    const checkUVC = genQuerySelectSql({
        table: "uvc_code",
        condition: `UVC = ${JSON.stringify(uvc)}`
    })
    const promisePool = pool.promise();
    try {
        const [rows, fields]: any = await promisePool.execute(checkUVC);
        if (rows?.length) {
            const { salt, hash } = wrappedCryptoToken({
                wrappedCryptoString: password
            })
            const insert_data = {
                full_name: name,
                DOB: dob,
                hashedPass: hash,
                UVC: uvc,
                constituency_id: constituency_id,
                salt: salt
            }
            const insertNewVoter = genQueryInsertSql({
                table: 'voter',
                insert_data: insert_data
            })
            const promisePool = pool.promise();
            try {
                const [rows, fields]: any = await promisePool.execute(insertNewVoter);
                const getRefreshToken: any = refreshTokenEncodedCrypto({
                    uvc: uvc,
                    hashedPass: hash,
                    role: 'voter'
                })

                await cookies().set('ref_tkn', getRefreshToken)
                return res.json({ success: true, token: getRefreshToken })
            }
            catch {
                return res.json({ success: false, message: "UVC code already used" })
            }
        }
        else {
            return res.json({ success: false, message: "UVC code invalid" })
        }
    }
    catch {
        return res.json({ success: false, message: "Something is wrong" })
    }
}

