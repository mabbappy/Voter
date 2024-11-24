import { pool } from "@/server/models/db";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
    const selectSettings = genQuerySelectSql({
        table: "uvc_code",
    })
    const promisePool = pool.promise();
    try {
        const [rows, fields]: any = await promisePool.query(`${selectSettings}`);
        return res.json({
            success: true, result: rows
        })
    }
    catch (err) {
        return res.json({ success: false, result: [] })
    }
}
