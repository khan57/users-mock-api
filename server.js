const app = require("express")();

app.get("/v1/users", (req, res) => {
  return res.json([
    {
      fullName: "Haseeb ur rehman",
      userId: 1,
    },
  ]);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Server is Up " + PORT));
