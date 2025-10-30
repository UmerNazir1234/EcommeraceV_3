import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    // get token from headers (support Bearer and raw)
    let raw = req.headers.token || req.headers.authorization || '';
    let token = raw.startsWith('Bearer ') ? raw.slice(7) : raw;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized, login again" });
    }

    // decode userId from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.log("authUser error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
