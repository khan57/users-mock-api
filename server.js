const app = require("express")();
const cors = require("cors");
const fs = require("fs");
const usersData = require("./users");
app.use(cors());
app.get("/v1/users", async (req, res) => {
  try {
    let { pageSize = 10 } = req.query;
    if (parseInt(pageSize, 10) && parseInt(pageSize, 10) > 100) {
      pageSize = 100;
    }
    let users = [];
    users = usersData.slice(0, pageSize);
    return res.json({ data: users, recordSize: users.length });
  } catch (error) {
    return res.json({ error: "Something went wrong" + error });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Server is Up " + PORT));
