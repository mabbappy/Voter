import { verifyUser } from "@/server/hooks/verifyUser";
import { poolExecute } from "@/server/models/db";
import genQueryDeleteSql from "@/server/mysql_gen/genQueryDeleteSql";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const deleteAdmin = genQueryDeleteSql({
        table: "candidate",
        condition: `canid = ${params?.id}`
    })
    return poolExecute({
        sql: deleteAdmin,
    })
}


