let emails = [];
const TOKEN = "234jlksdf0ew0flksd";
export const Signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!emails.includes(email)) {
    emails.push(email);
    return res.status(200).send({ status: "SUCCESS", token: TOKEN });
  } else {
    return res
      .status(500)
      .send({ status: "ERROR", errorMessage: "Email already exists" });
  }
};

export const Login = (req, res, next) => {
  const { email, password } = req.body;
  if (emails.includes(email)) {
    return res.status(200).send({ status: "SUCCESS", token: TOKEN });
  } else {
    return res
      .status(500)
      .send({ status: "ERROR", errorMessage: "No such email exists" });
  }
};
