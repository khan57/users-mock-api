const app = require("express")();

app.get("/v1/users", async (req, res) => {
  try {
    let { pageSize = 10 } = req.query;
    if (parseInt(pageSize) && parseInt(pageSize) > 100) {
      pageSize = 100;
    }
    let users = await fetch(
      `https://api.github.com/users?per_page=${pageSize}`
    );

    users = await users.json();

    users = users.map((user) => {
      const { login, avatar_url, id } = user;
      return {
        name: login,
        email: `${login}@gmail.com`,
        imageUrl: avatar_url,
        id,
      };
    });

    return res.json(users);
  } catch (error) {
    return res.json({ error: "Something went wrong" + error });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Server is Up " + PORT));
