const app = require("express")();

app.get("/v1/users", async (req, res) => {
  let { pageSize = 10 } = req.query;
  if (parseInt(pageSize) && parseInt(pageSize) > 100) {
    pageSize = 100;
  }
  let users = await fetch(`https://api.github.com/users?per_page=${pageSize}`);
  users = await users.json();

  return res.json(users);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Server is Up " + PORT));
