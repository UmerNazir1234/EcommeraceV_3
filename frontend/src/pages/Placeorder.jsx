import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const {navigate,backendUrl,token,cartitems,setcartitem,getcartAmount,delivery_fee,products} = useContext(ShopContext)
  const [formdata,setformdata]= useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcod:'',
    country:'',
    phone:''
  })

  const onChalgeHandler =(event)=>{
    const name = event.target.name;
    const vale = event.target.value;

    setformdata(data =>({...data,[name]:vale}))

  }
 const onSubmitHandler = async (event)=>{
  event.preventDefault()
  try {
    let orderItem = []
    for (const items in cartitems){
      for(const item in cartitems[items]){
        if (cartitems[items][item]>0 ){
          const itemInfo = structuredClone(products.find(product=>product._id===items))
          if (itemInfo) {
            itemInfo.size=item
            itemInfo.quantity = cartitems[items][item]
            orderItem.push(itemInfo)
            
          }
        }
      }
    }
    let orderData = {
      address:formdata,
      items:orderItem,
      amount:getcartAmount() + delivery_fee
    }
    switch(method){
      //api call for cod
      case 'cod':
        const response = await axios.post(backendUrl + '/place',orderData,{headers:{token}})

        if (response.data.success) {
          setcartitem({})
          navigate('/order')
          
        }
        else{
          toast.error(response.data.message)
        }
        break;
        default:
          break;
    }
  } catch (error) {
    toast.error(error.message)
  }

 }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t justify-between">
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChalgeHandler} name="firstname" value={formdata.firstname}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
            type="text"
          />
          <input required onChange={onChalgeHandler} name="lastname" value={formdata.lastname}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
            type="text"
          />
        </div>
        <input required onChange={onChalgeHandler} name="email" value={formdata.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email"
          type="email"
        />
        <input required onChange={onChalgeHandler} name="street" value={formdata.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
          type="text"
        />
        <div className="flex gap-3">
          <input required onChange={onChalgeHandler} name="city" value={formdata.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
            type="text"
          />
          <input required onChange={onChalgeHandler} name="state" value={formdata.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
            type="text"
          />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChalgeHandler} name="zipcod" value={formdata.zipcod}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
            type="number"
          />
          <input required onChange={onChalgeHandler} name="country" value={formdata.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
            type="text"
          />
        </div>
        <input required onChange={onChalgeHandler} name="phone" value={formdata.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
          type="number"
        />
      </div>

      {/* Right Side - Cart + Payment */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${
                method === "stripe" ? "border-black" : "border-gray-300"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-black" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${
                method === "razorpay" ? "border-black" : "border-gray-300"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-black" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="Razorpay"
              />
            </div>
          </div>

          {/* Cash on Delivery */}
          <div
            onClick={() => setMethod("cod")}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded mt-3 ${
              method === "cod" ? "border-black" : "border-gray-300"
            }`}
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "cod" ? "bg-black" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
