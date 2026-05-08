import express from 'express'
import { addFood, listFood, removeFood, editFood } from '../controllers/foodController.js'
import multer from 'multer'
import adminAuth from '../middleware/adminAuth.js'

const foodRouter = express.Router()

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

foodRouter.get("/list", listFood)                                        // public
foodRouter.post("/add", adminAuth, upload.single("image"), addFood)      // admin only
foodRouter.post("/remove", adminAuth, removeFood)                        // admin only
foodRouter.post("/edit", adminAuth, upload.single("image"), editFood)    // admin only

export default foodRouter