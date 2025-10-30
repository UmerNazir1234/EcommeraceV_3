import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized, login again" });
    }

    // ✅ decode token payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ check payload content (e.g., email & password for admin)
    if (
      decoded.email !== process.env.ADMIN_EMAIL ||
      decoded.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Not Authorized, login again" });
    }

    // ✅ allow request to continue
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
