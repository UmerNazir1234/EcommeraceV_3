import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from "../Components/Title";
import ProductItem from '../Components/ProductItem';



const Collection = () => {
  const {products ,search, showsearch }= useContext (ShopContext);
  const [showfilter,setshowfilter] = useState(false);
  const [filterproducts,setfilterproduct]= useState([]);
  const [category,setcategory] = useState([]);
  const [subcategory,setsubcategory] = useState([]);
  const [sortType,setsoetType] = useState('relavent')

   const toggleCategory = (e)=>{
    if (category.includes(e.target.value)) {
      setcategory(prev=>prev.filter(item=> item!==e.target.value))
      
    }
    else{
      setcategory(prev=>[...prev,e.target.value]);
    }
   }
   const toggleSubcategory =(e)=>{
      if (subcategory.includes(e.target.value)) {
      setsubcategory(prev=>prev.filter(item=> item!==e.target.value))
      
    }
    else{
      setsubcategory(prev=>[...prev,e.target.value]);
    }

   }
   {/*const applyfilter=()=>{
    let productCopy = products.slice();

    if (category.length>0) {
      productCopy = productCopy.filter(item=> category.includes(item.category));
      
    }
    if(subcategory.length >0){
      productCopy= productCopy.filter(item=> subcategory.includes(item.subcategory))
    }
    setfilterproduct(productCopy)
   }*/}
   const applyfilter = () => {
  let productCopy = products.slice();

  if (showsearch && search) {
    productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    
  }

  if (category.length > 0) {
    productCopy = productCopy.filter(item => category.includes(item.category));
  }

  if (subcategory.length > 0) {
    productCopy = productCopy.filter(item => subcategory.includes(item.subCategory));
  }

  setfilterproduct(productCopy);
};

const sortProduct = ()=>{
  let fpCopy = filterproducts.slice();
  switch (sortType){
    case'low-high':
    setfilterproduct(fpCopy.sort((a,b)=>(a.price -b.price)))
    break;

    case 'high-low':
      setfilterproduct(fpCopy.sort((a,b)=>(b.price -a.price)))
    break;

    default:
      applyfilter();
      break;

  }
}



  useEffect(()=>{
    applyfilter();

  },[category,subcategory,search,showsearch,products])

  useEffect(()=>{
    sortProduct();

  },[sortType])

 
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={()=>setshowfilter(!showfilter)} className='my-2 text-x1 flex items-center cursor-pointer gap-2'>FILTER
          <img className={`h-3 sm:hidden ${showfilter ? 'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubcategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubcategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubcategory}/>Winterwear
            </p>
          </div>
        </div>

      </div>
      {/*right side  */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          <select onChange={(e)=>setsoetType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort By:Low To High</option>
            <option value="high-low">Sort By:High To Low</option>
          </select>
        </div>
        {/*Map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterproducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Collection
