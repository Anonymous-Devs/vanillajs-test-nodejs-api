const path = require("path");
const db = require(path.resolve("db"));

class Test {
    update() {
        const text = "";
    }
    async getTest(req, res) {
        try {
            /* Get shallow data by `name` key in an object*/
            let text = "SELECT data->'name' as year_engaged FROM test";
            /* Get a data from 2 dept in an object*/
            text = "SELECT data->'extra_info'->'married' as year_engaged FROM test";
            // select a JSON array element:
            text = "select data ->'characteristics'->0 as first_characteristic FROM test;"
                // select a json array element as text:
            text = "select data ->'characteristics'->>0 as first_characteristic FROM test;"
                // select a json object at specified path ('#>>' for text output):
            text = " select data#>'{extra_info, married}' as marriage_date FROM test";
            // text = "select data#>'{characteristics, 2}' FROM test";
            text = ` update test set data = jsonb_set(data, '{"
         age "}', '18') where id= 2 RETURNING *;`;

            text = ` update test set data = jsonb_set(data, '{age}' , "{'age' :' 90'}") where id= 2 RETURNING *;`;
            // text = "select data from test";

            const value = ["Jacques"];
            const query = await db.query(text);
            res.json({ okay: true, message: query.rows });
        } catch (e) {
            console.log(e);
            res.json({ okay: false, message: e.message })
        }
    }
}

module.exports = new Test()