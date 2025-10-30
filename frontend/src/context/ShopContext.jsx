import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl=import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [search,setsearch] = useState('');
  const [showsearch, setshowsearch] = useState(false);
  const [cartitems,setcartitem]= useState({}); //const [cartitems, setcartitem] = useState({});
  const [products,setproducts] = useState([]);
  const [token ,settoken] = useState('');
  const navigate = useNavigate();

  

const addTocart = async (itemId, size) => {
  if (!size) {
    toast.error('Select Product Size');
    return;
  }

  let cartdata = structuredClone(cartitems);

  if (cartdata[itemId]) {
    if (cartdata[itemId][size]) {
      cartdata[itemId][size] += 1;
    } else {
      cartdata[itemId][size] = 1;
    }
  } else {
    cartdata[itemId] = {};
    cartdata[itemId][size] = 1;
  }

  setcartitem(cartdata);

  if (token) {
    try {
      const { data } = await axios.post(
        backendUrl + '/cart/add',   // ✅ include `/cart`
        { itemId, size },
        { headers: { token } }      // ✅ send raw token
      );

      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
};


  const getcartCont= ()=>{
    let totalCount =0;
    for(const items in cartitems){
      for(const item in cartitems[items]){
        try {
          if (cartitems[items][item]>0) {
            totalCount+=cartitems[items][item];
            
          }
          
        } catch (error) {
          
        }

      }
    }
    return totalCount;
  }
const updateQuentity = async (itemId,size,quantity)=>{
  let catData = structuredClone(cartitems);
  catData[itemId][size]= quantity;
  setcartitem(catData);

  if (token) {
    try {
      const { data } = await axios.post(
        backendUrl + "/cart/update",
        { itemId, size, quantity },   // ✅ userId will be added by authUser
        { headers: { token } }        // ✅ send token
      );

      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }


}


const getcartAmount= () =>{
  let toatalAmount =0;
  for(const items in cartitems){
    let itemInfo = products.find((product)=> product._id === items);
    for(const item in cartitems[items]){
      try {
        if (cartitems[items][item]>0) {
          toatalAmount+=itemInfo.price * cartitems[items][item];
          
        }
        
      } catch (error) {
        
      }
    }
   
  }return toatalAmount;
}

const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/list`);
      if (response.data.success) {
        setproducts(response.data.data);
        console.log("Fetched products:", response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch products");
    }
  };
const getUserCart = async (token) => {
  try {
    const response = await axios.post(backendUrl + '/cart/get', {}, { headers: { token } });
    if (response.data.success) {
      setcartitem(response.data.cartdata);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};



  useEffect(() => {
    getProductData(); // fetch once on mount
  }, []);

  useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
      settoken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'));
       
      
      
    }

  },[])

// fetch cart when token is set
  const value = {
    products,setproducts,
    currency,
    delivery_fee,
      search,
      setsearch,
      showsearch,
      setshowsearch,
      cartitems,
      setcartitem,
      addTocart,
      getcartCont,
      updateQuentity,
      getcartAmount,
      navigate,
      backendUrl,
      token,settoken
      
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
