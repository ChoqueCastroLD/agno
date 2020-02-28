module.exports = {
    // migration: {},
    seeder: {
        tables: () => [
            { table: 'countries', data: require('./countries.js') },
        ],
        process: ({table, data}) => {
            if(typeof data === 'string') {
                return conn.query(data);
            } else {
                return conn.query(`INSERT INTO \`${table}\` SET ?`, data);
            }
        }
    }
}