// beta: https://www.npmjs.com/package/mysql-query-gen?activeTab=readme

const genQuerySelectSql = ({
    table,
    limitSkip,
    condition = '',
    sort = {},
    havingCondition = '',
    groupBY = [],
    specific_column = [],
    min = '',
    max = '',
    count = '',
    sum = ""
}: {
    table: string,
    limitSkip?: { limit?: string | number, skip?: string | number },
    condition?: string,
    sort?: any,
    havingCondition?: string,
    groupBY?: string[],
    specific_column?: string[],
    min?: string,
    max?: string,
    count?: string,
    sum?: string
}) => {

    const table_name = table;

    let mmcsColumn;
    if (min) {
        mmcsColumn = ` min(${min}) as minimum `
    }
    else if (max) {
        mmcsColumn = ` max(${max}) as maximum `
    }
    else if (count) {
        mmcsColumn = ` count(${count}) as count `
    }
    else if (sum) {
        mmcsColumn = ` sum(${sum}) as summation `
    }


    let sql = `SELECT ${(specific_column?.length ? specific_column?.join(', ') : (mmcsColumn ? mmcsColumn : '*'))} FROM ${table_name} ${condition ? "WHERE " + condition : ''}`;

    // let limit_skip = ` LIMIT ${skip}, ${limit}`;
    const limit = limitSkip?.limit
    const skip = limitSkip?.skip
    let limit_skip;
    if (limit) {
        limit_skip = ` LIMIT ${skip}, ${limit}`;
    }

    let sorting;
    if (Object.entries(sort)?.length >= 1) {
        sorting = ` ORDER BY ${Object.entries(sort).map(f => {
            const field_column = f[0];
            const asc = f[1];
            return `${field_column} ${(asc == 1 ? "ASC" : "DESC")}`
        }).toString()}`
    }


    let getGroupBy;
    if (groupBY?.length) {
        getGroupBy = ` GROUP BY  ${groupBY?.join(',')}`
    }

    sql += `${getGroupBy ? getGroupBy : ""} ${havingCondition ? " HAVING " + havingCondition : ''}${sorting ? sorting : ''}${limit_skip ? limit_skip : ""}`

    return sql;
};


export default genQuerySelectSql;