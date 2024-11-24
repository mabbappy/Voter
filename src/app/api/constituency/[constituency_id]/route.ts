import { pool } from "@/server/models/db";
import genQueryRdmsSql from "@/server/mysql_gen/genQueryRdmsSql";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request, { params }: { params: { constituency_id: string } }) {
    const selectConstituency = genQueryRdmsSql({
        table_list: {
            table1: "constituency",
            table2: 'candidate',
            table3: 'party',
        },
        relation_key: {
            on: {
                relation: "RIGHT JOIN",
                table1: "constituency_id",
                table2: "constituency_id",
            },
            on1: {
                relation: "LEFT JOIN",
                table2: "party_id",
                table3: "party_id",
            }
        },
        condition: `constituency.constituency_id = ${JSON.stringify(params?.constituency_id)}`,
        specific_column: {
            table1: ["*"],
            table2: ["*"],
            table3: ["*"],
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
        return res.json({ success: false, result: [] })
    }
}
