const whiteList = ["http://localhost:3000"];

const corsOptions = (req, callback) => {
  let corsOptions;
  const origin = req.header("Origin");

  console.log("Origin:", origin);

  if (origin && whiteList.includes(origin)) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};

module.exports = corsOptions;
