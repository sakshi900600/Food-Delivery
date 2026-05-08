import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  const { token } = req.headers
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again." })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized." })
    }
    next()
  } catch (error) {
    res.json({ success: false, message: "Invalid token." })
  }
}

export default adminAuth