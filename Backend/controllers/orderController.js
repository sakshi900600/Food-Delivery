import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const MINIMUM_AMOUNT_PAISE = 5000; // ₹50 minimum (5000 paise) — safely above Stripe's limit

const placeOrder = async (req, res) => {
  const frontend_url = process.env.PRODUCTION_FRONTEND_URL || "http://localhost:5173"

  try {
    const totalAmount = req.body.amount; // in rupees (e.g. 22)
    const totalAmountPaise = totalAmount * 100;

    // Block before hitting Stripe if amount is too small
    if (totalAmountPaise < MINIMUM_AMOUNT_PAISE) {
      return res.json({
        success: false,
        message: `Minimum order amount is ₹${MINIMUM_AMOUNT_PAISE / 100}. Your total is ₹${totalAmount}.`
      })
    }

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100  // paise
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200  // ₹2 = 200 paise
      },
      quantity: 1
    })

    // Create Stripe session FIRST — before saving to DB
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=PENDING`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=PENDING`
    })

    // Only save to DB if Stripe session was created successfully
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: totalAmount,
      address: req.body.address,
      stripeSessionId: session.id  // store session ID to verify later
    })

    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

    // Update URLs with real order ID
    await stripe.checkout.sessions.update ? null : null // not needed, use metadata instead

    res.json({ success: true, session_url: session.url, orderId: newOrder._id })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message || "Error placing order" })
  }
}

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      res.json({ success: true, message: "Paid" })
    } else {
      // Payment cancelled/failed — delete the order from DB
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false, message: "Payment cancelled" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const userOrders = async (req, res) => {
  try {
    // Only show paid orders to the user
    const orders = await orderModel.find({ userId: req.body.userId, payment: true })
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({ success: true, message: "Status Updated" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }