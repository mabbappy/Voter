import url_query from "@/server/hooks/url_query";
import { pool } from "@/server/models/db";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import genQueryUpdateSql from "@/server/mysql_gen/genQueryUpdateSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
    const selectSettings = genQuerySelectSql({
        table: "settings",
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

export async function PUT(req: Request) {
    const body = await req?.json()
    const query = url_query({ url: req?.url })
    const setting_id = query("setting_id")

    const { isStartElection } = body
    const update_sql = genQueryUpdateSql({
        table: "settings",
        update_data: {
            isStartElection: isStartElection,
        },
        condition: `setting_id = ${JSON.stringify(setting_id)}`
    })
    const promisePool = pool.promise();
    try {
        const [rows, fields]: any = await promisePool.query(update_sql);
        return res.json({
            success: true, result: rows
        })
    }
    catch (err) {
        return res.json({ success: false, result: [] })
    }
}
