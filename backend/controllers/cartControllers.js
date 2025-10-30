import usermodel from "../models/usermodel.js";

// Add product to cart
const addTocart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await usermodel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = { ...userData.cartdata }; // ✅ lowercase d

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await usermodel.findByIdAndUpdate(userId, { cartdata: cartData });

    res.json({ success: true, message: "Added To Cart", cartdata: cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update product in cart
const updatecart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await usermodel.findById(userId);

    let cartData = userData.cartdata; // ✅ lowercase d

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await usermodel.findByIdAndUpdate(userId, { cartdata: cartData });

    res.json({ success: true, message: "Cart updated", cartdata: cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart
const getUsercart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await usermodel.findById(userId);

    let cartData = userData.cartdata; // ✅ lowercase d

    res.json({ success: true, cartdata: cartData }); // keep key consistent
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addTocart, updatecart, getUsercart };
