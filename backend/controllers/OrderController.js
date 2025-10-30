import OrderModel from "../models/OrderModel.js";
import usermodel from "../models/usermodel.js";
// placing order using COD Method 
 const placeOrder = async(req,res)=>{
    try {
       const { userId, items, amount, address } = req.body;

        const orderdata= {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()

        }
        const newOrder = new OrderModel(orderdata)
        await newOrder.save()

       await usermodel.findOneAndUpdate({ _id: userId }, { cartData: {} });
       res.json({success:true, message:"Order placed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

 }

  //placing order using Strip Method 
 const placeOrderStrip = async(req,res)=>{
    
 }

  //placing order using Razorpay Method 
 const placeOrderRazorpay = async(req,res)=>{
    
 }

 // All orders data for admin panel
 const allOrders = async (req,res)=>{
    try {
        const orders = await OrderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

 }
  //User Order Data for front end 
 const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body

        const orders = await OrderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
    
 }
 //Updat order status for admain penal
 const updateStaus = async(req,res)=>{
    try {
        const { orderId, status } = req.body;
        await OrderModel.findByIdAndUpdate(orderId,{status});
        res.json({success:true,message:"Status Update"})
    } catch (error) {
        console.error("❌ Error updating order status:", error);
    return res.json({ success: false, message: error.message });
    }
 }

 export {placeOrder,placeOrderStrip,placeOrderRazorpay,allOrders,userOrders,updateStaus}