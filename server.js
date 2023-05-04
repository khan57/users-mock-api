const app = require("express")();
const cors = require("cors");
app.use(cors());
app.get("/v1/users", async (req, res) => {
  try {
    let { pageSize = 10 } = req.query;
    if (parseInt(pageSize) && parseInt(pageSize) > 50) {
      pageSize = 50;
    }
    let users = await fetch(
      `https://api.github.com/users?per_page=${pageSize}`
    );

    users = await users.json();

    users =
      Array.isArray(users) && users.length > 0
        ? users.map((user) => {
            // Generate a random day between 1 and 28
            var day = Math.floor(Math.random() * 28) + 1;

            // Generate a random month between 1 and 12
            var month = Math.floor(Math.random() * 12) + 1;

            // Generate a random year between 1900 and 2023 (current year)
            var year = Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900;

            // Format the date as "day-month-year"
            var dob = day + "-" + month + "-" + year;
            const { login, avatar_url, id } = user;
            return {
              name: login,
              email: `${login}@gmail.com`,
              imageUrl: avatar_url,
              id,
              date_of_birth: dob,
            };
          })
        : [];

    return res.json(users);
  } catch (error) {
    return res.json({ error: "Something went wrong" + error });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Server is Up " + PORT));
