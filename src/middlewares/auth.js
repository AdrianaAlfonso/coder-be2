const authorization = (role) => {
  return (req, res, next) => {
    if (req?.user?.role === role) {
      next();
    } else {
      return res.status(403).send({ message: 'Forbidden Access' });
    }
  };
};

export default authorization;
