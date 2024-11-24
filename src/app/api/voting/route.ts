import { pool } from "@/server/models/db";
import genQueryInsertSql from "@/server/mysql_gen/genQueryInsertSql";
import { NextResponse as res } from "next/server";

export async function POST(req: Request) {
    const body = await req?.json()
    const { UVC, canid, voter_id } = body

    const selectConstituency = genQueryInsertSql({
        table: "vote_count",
        insert_data: {
            UVC,
            canid,
            voter_id
        }
    })
    const promisePool = pool.promise();
    try {
        const [rows, fields]: any = await promisePool.query(`${selectConstituency}`);
        return res.json({ success: true, result: rows })
    }
    catch (err) {

        return res.json({ success: false, result: [] })
    }

}
