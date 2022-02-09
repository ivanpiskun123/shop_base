import React,{useEffect} from 'react'
import {useParams} from "react-router-dom"
import {useState} from "react"
import ImageSlider from '../images/ImageSlider'
import { Button, Container,Row,Col } from 'react-bootstrap'

function ProductDetails({currentUser}) {
const {id}=useParams()
const[product,setProduct]=useState(null)
console.log(id)
    useEffect(()=>{
        fetch(`/products/${id}`)
        .then(res=>{
            if(res.ok){
                res.json().then(data=>setProduct(data))
            }
        })
    },[])
    // console.log(product)
    // console.log(currentUser.id)
    function handleAddToCart(){
        fetch("/addtocart",{
          method:"post",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({
            product_id:product.id,
            item_quantity:1
          })
        }).then(res=>res.json())
        .then(data=>console.log(data))
      }
    return (
              <Container style={{marginTop:"58px"}}>
       {product!==null&&<>
       <Row className="justify-content-md-left">
      <Col  sm={8} style={{marginTop:"50px"}}>
           
         
          <ImageSlider images={product.images}></ImageSlider>
          </Col>  
          
        
            <Col sm={4} style={{marginTop:"50px"}}>
            <h1>{product.name}</h1>
            <p>Size: {product.size}</p>
             <p>Description: {product.description}</p>
             <p>Price: ${product.price}</p>
             {product.quantity<3?<div style={{color:"red"}}role="alert">
            only {product.quantity} left
            </div>:null}
            {product!==null&&product.quantity===0||currentUser!==null&&product.user_id===currentUser.id?<button disabled>{product.quantity===0?"OUT OF STOCK":"ADD TO CART"}</button>:<button className="card__btn" onClick={handleAddToCart}>ADD TO CART</button>}
            {/* {currentUser!==null&&product.user_id===currentUser.id?  <Button variant="primary" size="lg" disabled>
           {product.quantity===0?"OUT OF STOCK":"ADD TO CART"} */}
           {/* </Button>:
            <Button>ADD TO CART</Button>} */}
               </Col>
               </Row>  
            </>}
        </Container>
    )
}

export default ProductDetails
