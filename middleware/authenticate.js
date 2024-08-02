const jwtToken = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.replace("Bearer ", "");
  if (token === undefined) {
    return res.status(401).json({ error: "Jwt Token Not Found" });
  } else {
    jwtToken.verify(token, "jwt", async (error, payload) => {
      if (error) {
        return res.status(401).json({ error: "Invalid Jwt Token" });
      }
      req.username = payload.username;
      next();
    });
  }
};

module.exports = authenticate;
