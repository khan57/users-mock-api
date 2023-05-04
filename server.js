const app = require("express")();
const cors = require("cors");
const fs = require("fs");
app.use(cors());
app.get("/v1/users", async (req, res) => {
  try {
    let { pageSize = 10 } = req.query;
    if (parseInt(pageSize, 10) && parseInt(pageSize, 10) > 100) {
      pageSize = 100;
    }
    let users = [];
    new Promise((resolve, reject) => {
      fs.readFile("users.json", (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          let tempData = JSON.parse(data);
          users = tempData.data.slice(0, pageSize);
          resolve(users);
        }
      });
    }).then((data) => {
      return res.json({ data, recordSize: data.length });
    });
  } catch (error) {
    return res.json({ error: "Something went wrong" + error });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Server is Up " + PORT));
