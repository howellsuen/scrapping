const { parse } = require('json2csv');
const fs = require("fs");

const fields = ['id', 'title'];
const opts = { fields };

const jsonToCsv = async(filename) => {
  try {
    const myData = require(`./${filename}.json`);
    const csv = parse(myData, opts);
    // console.log(csv);
    await fs.writeFile(`./${filename}.csv`,
      csv,
      function(err) {
        if (err) throw err;
      }
    )
  } catch (err) {
    console.error(err);
  }
}

jsonToCsv('fitness-435');