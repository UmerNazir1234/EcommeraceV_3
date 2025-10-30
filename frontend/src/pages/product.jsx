import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets, products } from '../assets/assets';
import Relatedproduct from '../Components/Relatedproduct';



const product = () => {
  const {productId} = useParams();
  const {products,currency,addTocart} = useContext(ShopContext);
  const [productData,setproductData] = useState(false);
  const [image,setimage] =useState('')
  const [size,setsize] = useState('')

  const fetchproductDara = async()=>{
    products.map((item)=>{
      if (item._id===productId) {
        setproductData(item)
        setimage(item.image[0])
        return null;
        
      }
    })

  }
  useEffect(()=>{
    fetchproductDara();

  },[productId,products])
  
  return productData ? (
   <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
    <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
      <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
        <div className='flex sm:flex-col overflow-auto sm:overflow-x-scroll justify-between sm:justify-normal sm:w-[18%] w-full'>
          {
            productData.image.map((item,index)=>(
              <img onClick={()=>setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))
          }
        </div>
        <div className='w-full sm:w-[80%]'>
          <img className='w-full h-auto' src={image} alt="" />
        </div>
      </div>
      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          <p className='p1-2'>(122)</p>
        </div>
        <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
           {productData.sizes.map((item, index) => (
  <button
    onClick={() => setsize(item)}
    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
    key={index}
  >
    {item}
  </button>
))}

          </div>
        </div>
        <button onClick={()=>addTocart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Add to Cart</button>
        <hr className='mt-8 sm:w-4/5' />
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% Original Product</p>
          <p>Cash on Devilary is avabile on this product </p>
          <p>Easy Return and exchang policy with 7 days </p>
        </div>
      </div>
    </div>
    <div className='mt-20'>
      <div className='flex'>
        <p className='border px-5 py-3 text-sm'>Description</p>
        <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
      </div>
      <div className=' flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus suscipit unde nihil laudantium sint tempore, dolores ducimus nulla repudiandae nam quasi temporibus assumenda officia deserunt, vitae harum animi ullam vero.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur architecto hic inventore obcaecati, nihil laboriosam reiciendis nulla laudantium nobis quam mollitia doloremque, eius, labore id quis illum sint. Quo, culpa.</p>

      </div>
    </div>
    <Relatedproduct category={productData.category} subcategory={productData.subcategory}/>


   </div>
  ):<div className='opacity-0'></div>
}
  export default product;  

