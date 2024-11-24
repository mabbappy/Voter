import { pool } from "@/server/models/db";
import genQueryRdmsSql from "@/server/mysql_gen/genQueryRdmsSql";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import { NextResponse as res } from "next/server";

export async function GET(req: Request, { params }: { params: { constituency_name: string } }) {

    const selectConstituency = genQueryRdmsSql({
        table_list: {
            table1: "candidate",
            table2: "constituency",
            table3: "party",
            table4: "vote_count",
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
            on2: {
                relation: "LEFT JOIN",
                table1: "canid",
                table4: "canid"
            }
        },
        specific_column: {
            table3: [
                `party,
CASE
    WHEN count(vote_count.canid) > 0 THEN count(vote_count.canid)
    ELSE 0
END as seat
                `
            ],
        },
        groupBY: ['party.party_id']
    })
    const promisePool = pool.promise();

    const settings = genQuerySelectSql({
        table: "settings"
    })

    try {
        const [rows, fields]: any = await promisePool.query(`${selectConstituency};${settings}`);
        const isStartElection = rows?.[1]?.[0]?.isStartElection
        const seat = rows?.[0]
        const find_max_seat = Math.max(...seat?.map((r: any) => r?.seat))

        const filter = seat?.find((r: any) => r?.seat == find_max_seat);

        const data = {
            "status": isStartElection ? "Incomplete" : "Completed",
            "winner": isStartElection ? "Coming soon" : filter?.party,
            "seats": seat
        }
        return res.json(data)
    }
    catch (err) {
        return res.json({ success: false, result: [] })
    }
}
