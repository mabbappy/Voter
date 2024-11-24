// beta: https://www.npmjs.com/package/mysql-query-gen?activeTab=readme

function genQueryUpdateSql({
    table,
    update_data = {},
    condition
}: {
    table: string,
    update_data: {},
    condition: string,
}) {
    const updateInfo = Object.entries(update_data)?.map((info) => {
        const column = info?.[0];
        const isNumber = typeof info?.[1] == 'number' || typeof info?.[1] == 'boolean';
        const column_value: any = info?.[1]
        const value = isNumber ? info?.[1] : column_value?.trim();

        const check = isNumber ? false : (value?.indexOf(column) == 0 || value?.lastIndexOf(column) == (value?.length - column?.length));

        return (column + '=' + ((isNumber ? false : (value?.match(/[+|-|\/|*]/gi)?.length == 1 && check)) ? value?.toString() : JSON?.stringify(value)));
    })?.join(',');

    const s = `UPDATE ${table} SET ${updateInfo}${condition ? " WHERE " + condition + " " : ""}`;
    return s;
}

export default genQueryUpdateSql;
