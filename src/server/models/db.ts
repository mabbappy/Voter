import mysql from 'mysql2';
import { NextResponse } from 'next/server';

const host: any = process.env.DB_HOST
const port: any = process.env.DB_PORT
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

const pool = mysql.createPool({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
    // timezone: 'UTC',
    waitForConnections: true,
    // connectionLimit: 10,
    // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    multipleStatements: true,
    keepAliveInitialDelay: 0
})


async function poolExecute({ sql = '', additional = {} }: { sql: string, additional?: any }) {
    const promisePool = pool.promise();
    try {
        const [rows, fields] = await promisePool.execute(sql);
        return NextResponse.json({
            success: true,
            result: rows,
            ...additional
        })
    }
    catch (err) {
        return NextResponse.json({ success: false, result: [] })
    }
}

async function poolQuery({ sql = '', additional = {} }: { sql: string, additional?: any }) {
    const promisePool = pool.promise();
    try {
        const [rows, fields] = await promisePool.query(sql);
        return NextResponse.json({
            success: true,
            result: rows,
            ...additional
        })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ success: false, result: [] })
    }
}


export {
    pool,
    poolExecute,
    poolQuery
};
