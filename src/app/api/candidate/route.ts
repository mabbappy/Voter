import { pool, poolQuery } from "@/server/models/db";
import genQueryInsertSql from "@/server/mysql_gen/genQueryInsertSql";
import genQueryRdmsSql from "@/server/mysql_gen/genQueryRdmsSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
    const selectConstituency = genQueryRdmsSql({
        table_list: {
            table1: "candidate",
            table2: "constituency",
            table3: "party"
        },
        relation_key: {
            on: {
                relation: "LEFT JOIN",
                table1: "constituency_id",
                table2: "constituency_id"
            },
            on1: {
                relation: "LEFT JOIN",
                table1: "party_id",
                table3: "party_id"
            },
        }
    })

    const promisePool = pool.promise();
    try {
        const [rows, fields] = await promisePool.query(selectConstituency);
        return res.json({
            result: rows
        })
    }
    catch (err) {
        console.log(err)
        return res.json({ success: false, result: [] })
    }
}

export async function POST(req: Request) {

    const body = await req.json()
    const { candidate, constituency_id, party_id } = body
    const postCandidate = genQueryInsertSql({
        table: "candidate",
        insert_data: {
            candidate, constituency_id, party_id
        }
    })
    return poolQuery({
        sql: postCandidate
    })
}