import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Redux/action';
import "./product.css"
import { products } from '../Data/products';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import ReactModal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';



const Products = () => {
  
    const dispatch = useDispatch()
    const data = useSelector( state => state.fetchProductsData.products)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    console.log(data)
   
 function getData(){
     dispatch(getProducts(products))
}

useEffect(() => {
    getData()
},)

const product = JSON.parse(localStorage.getItem("product"))

  return (
   <div className='product_container'>
    {data && data.map(ele => {
        return(<>
            <div className='pizza_box' key={ele.id}>
                <img src={ele.img} alt={ele.name} />
                <h3>{ele.name}</h3>
                <Rating className='rating' name="read-only" value={ele.rate} readOnly />
                <h2>${ele.price}.00</h2>
                <div className='two_buttons'>
                <Button className='button add_cart_button' variant="contained" onClick={() => navigate("/order")}>ADD TO CART</Button>
                <Button className='button quick_view_button' variant="contained" onClick={() => {
                    setIsOpen(true)
                    localStorage.setItem("product", JSON.stringify(ele))
                }}>QUICK VIEW</Button>
                </div>
            </div>
        </>)
    })}
    
    <div className='react_modal'>
                    <ReactModal
                        className="modal"
                        isOpen={isOpen}
                        contentLabel="Example Modal"
                        onRequestClose={() => setIsOpen(false)}
                        style={{
                            content: {
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            },
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        }}
                    >
                        <div className='left_modal'>
                            <div className='product_image'>
                                <img src={product.img} alt={product.name} />
                            </div>
                        </div>

                        <div className='right_modal'>
                           <div className='right_modal_top'>
                            <h2>{product.name}</h2>
                            <div className='rating_pro'>
                            <div><Rating className='rating' name="read-only" value={product.rate} readOnly /></div>
                            <div><p>(1 customer review)</p></div>
                            </div>
                            <h3>${product.price}.00</h3>
                           </div>

                           <div className='right_modal_middle'>
                            <p>{product.desc}</p>
                            <div className='product_details'>
                                <h4>NUTRITIONAL VALUE PER 100 G:</h4>
                                <div className='more_details'>
                                    <p>Calories</p>
                                    <div className='dotted line1' ></div>
                                    <p>800 Kcal</p>
                                </div>
                                <div className='more_details'>
                                    <p>Carbohydrates</p>
                                    <div className='dotted line2'></div>
                                    <p>20 g</p>
                                </div>
                                <div className='more_details'>
                                    <p>Squirrels</p>
                                    <div className='dotted line3'></div>
                                    <p>30 g</p>
                                </div>
                                <div className='more_details'>
                                    <p>Fats</p>
                                    <div className='dotted line4'></div>
                                    <p>50 g</p>
                                </div>
                            </div>
                           </div>

                           <div className='right_modal_bottom'>
                           <Button className='button add_cart_button' variant="contained" onClick={() => navigate("/order")}>ADD TO CART</Button>
                           </div>
                        </div>
                        <div className='close_button' onClick={() => setIsOpen(false)}>
                            <CloseIcon />
                        </div>
                    </ReactModal>
                </div>
   </div>
  )
}

export default Products