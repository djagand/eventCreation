export const PingTest = (req, res, next) => {
  return res
    .status(200)
    .send({ status: "SUCCESS", statusMessage: "Server is up and running" });
};
