import { pool } from "@/server/models/db";
import genQueryRdmsSql from "@/server/mysql_gen/genQueryRdmsSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request, { params }: { params: { constituency_name: string } }) {
    const selectConstituency = genQueryRdmsSql({
        table_list: {
            table1: "candidate",
            table2: "constituency",
            table3: "party",
        },
        relation_key: {
            on: {
                relation: 'LEFT JOIN',
                table1: "constituency_id",
                table2: "constituency_id"
            },
            on1: {
                relation: 'LEFT JOIN',
                table1: "party_id",
                table3: "party_id"
            },
        },
        specific_column: {
            table1: ['candidate as name', 'vote_count as vote'],
            table3: ['party'],
        }
    })
    const promisePool = pool.promise();
    try {
        const [rows, fields] = await promisePool.query(selectConstituency);
        return res.json({
            constituency: params?.constituency_name,
            result: rows,
        })
    }
    catch (err) {
        return res.json({ success: false, result: [] })
    }
}
