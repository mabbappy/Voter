import { pool } from "@/server/models/db";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
    const selectParty = genQuerySelectSql({
        table: "party"
    })
    const promisePool = pool.promise();
    try {
        const [rows, fields] = await promisePool.query(selectParty);
        return res.json({
            result: rows
        })
    }
    catch (err) {
        return res.json({ success: false, result: [] })
    }
}
