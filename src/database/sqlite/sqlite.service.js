import sqlite3 from "sqlite3";

export class SQLiteService {

    constructor(database = "dorianmintbot.db") {

        this.db = new sqlite3.Database(database);

    }

    run(sql, params = []) {

        return new Promise((resolve, reject) => {

            this.db.run(sql, params, function (err) {

                if (err) {

                    reject(err);

                    return;

                }

                resolve(this);

            });

        });

    }

    get(sql, params = []) {

        return new Promise((resolve, reject) => {

            this.db.get(sql, params, (err, row) => {

                if (err) {

                    reject(err);

                    return;

                }

                resolve(row);

            });

        });

    }

    all(sql, params = []) {

        return new Promise((resolve, reject) => {

            this.db.all(sql, params, (err, rows) => {

                if (err) {

                    reject(err);

                    return;

                }

                resolve(rows);

            });

        });

    }

    close() {

        this.db.close();

    }

}

export default SQLiteService;