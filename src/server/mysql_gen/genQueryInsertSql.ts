// beta: https://www.npmjs.com/package/mysql-query-gen?activeTab=readme

function genQueryInsertSql({ table, insert_data, hasDate = false, date_field }: { table: string, insert_data: {} | any, hasDate?: false | true, date_field?: string }) {
    const getColumns = [...Object.keys(insert_data)].join(',');
    const columnValues = JSON?.stringify([...Object.values(insert_data)])?.slice(1, -1);
    const sql = `INSERT INTO ${table} (${getColumns}${hasDate ? ("," + date_field) : ""}) VALUES (${columnValues}${hasDate ? ",CURRENT_TIMESTAMP" : ""})`;
    return sql
}
export default genQueryInsertSql;
