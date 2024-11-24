import { pool } from "@/server/models/db";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
    const selectConstituency = genQuerySelectSql({
        table: "constituency"
    })
    const promisePool = pool.promise();
    try {
        const [rows, fields] = await promisePool.query(selectConstituency);
        return res.json({
            result: rows
        })
    }
    catch (err) {
        return res.json({ success: false, result: [] })
    }
}
