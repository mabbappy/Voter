import url_query from "@/server/hooks/url_query";
import { pool } from "@/server/models/db";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
    const query = url_query({ url: req?.url })
    const voter_id = query("voter_id")
    const uvc = query("uvc")

    const selectConstituency = genQuerySelectSql({
        table: "vote_count",
        condition: `voter_id = ${JSON.stringify(voter_id)} and uvc = ${JSON.stringify(uvc)}`
    })
    const selectSettings = genQuerySelectSql({
        table: "settings",
    })

    const promisePool = pool.promise();
    try {
        const [rows, fields]: any = await promisePool.query(`${selectConstituency};${selectSettings}`);
        return res.json({
            success: true, result: {
                isVoted: Boolean(rows?.[0]?.length),
                isStartElection: Boolean(rows?.[1]?.[0]?.isStartElection)
            }
        })
    }
    catch (err) {
        return res.json({ success: false, result: [] })
    }
}
