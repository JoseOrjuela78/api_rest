if (global.poolConfiguration.poolMax > 4) {
    process.env.UV_THREADPOOL_SIZE = global.poolConfiguration.poolMax;
}

const oracledb = require('oracledb');
oracledb.fetchAsString = [oracledb.CLOB, oracledb.BUFFER];

const databaseFuncs = {};

const config = {
    user: global.environment.back_db.user,
    password: global.environment.back_db.password,
    connectString: global.environment.back_db.connectString,
    events: global.poolConfiguration.events,
    externalAuth: global.poolConfiguration.externalAuth,
    poolIncrement: global.poolConfiguration.poolIncrement,
    poolAlias: 'corredorCont', //global.poolConfiguration.poolAliasCont,
    poolMax: global.poolConfiguration.poolMax,
    poolMin: global.poolConfiguration.poolMin,
    poolPingInterval: global.poolConfiguration.poolPingInterval,
    poolTimeout: global.poolConfiguration.poolTimeout,
    queueTimeout: global.poolConfiguration.queueTimeout,
    stmtCacheSize: global.poolConfiguration.stmtCacheSize
};

databaseFuncs.init = function() {
    return oracledb.createPool(config).then(pool => {
        return pool;
    }).catch(err => {
        console.error(err);
        return null;
    });
};

databaseFuncs.getConnection = function() {
    const pool = oracledb.getPool(config.poolAlias);
    return pool.getConnection().then(connect => {
        return connect;
    });
};

databaseFuncs.closeConnection = function(connection) {
    connection.close(function(err) {
        if (err) console.error(err);
    });
};

databaseFuncs.executeQuery = function(connection, sql, parameters = [], autoCommit = false) {
    return connection.execute(sql, parameters, { outFormat: oracledb.OBJECT, autoCommit: autoCommit }).catch(err => {
        console.log('error en database', err);
        this.closeConnection(connection);
        throw err;
    });
};

databaseFuncs.fetchRowsFromCursor = function(resultSet) {
    const numRows = 500;
    return resultSet.getRows(numRows).then(result => {
        resultSet.close();
        return result;
    }).catch(err => {
        console.log(err);
    });
};

databaseFuncs.fetchManyRowsFromCursor = function(resultSet, numRows) {
    return resultSet.getRows(numRows).then(result => {
        resultSet.close();
        return result;
    }).catch(err => {
        console.log(err);
    });
};

databaseFuncs.fetchRowFromCursor = function(resultSet) {
    return resultSet.getRow().then(result => {
        resultSet.close();
        return result;
    });
};

module.exports = databaseFuncs;