import { verifyUser } from "@/server/hooks/verifyUser";
import { poolQuery } from "@/server/models/db";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import decodedTokenJWT from "@/server/utils/decodedTokenJWT";
import { cookies, headers } from "next/headers";
import { NextResponse as res } from "next/server";

export async function POST(req: Request) {
  const ref_tkn = cookies().get("ref_tkn")?.value || headers().get("ref_tkn");
  try {
    const tokenDecode: any = decodedTokenJWT({
      token: ref_tkn,
      tokenSecret: process.env.ADMIN_REFRESH_TOKEN,
    });

    if (tokenDecode.success) {
      try {
        const { check, email, role, uvc } = await verifyUser();
        const user_role = role ? role : tokenDecode?.data?.role
        let sql = ''
        if (email) {
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

        if (check) {
          return poolQuery({
            sql: sql,
            additional: {
              role: user_role,
              isLoggedIn: true,
            },
          });
        }
        else {
          return res.json({
            success: false,
          });
        }
      }
      catch (err) {
        return res.json({ success: false, message: "Something is wrong" });
      }
    }
    else {
      return res.json({
        success: false,
        user_details: {},
      });
    }
  }
  catch (err) {
    return res.json({ success: false });
  }
}
