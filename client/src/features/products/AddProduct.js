import React from 'react'
import {Form} from "react-bootstrap"

function AddProduct() {
    return (
        <div className="m-3">
            <h1>Upload your product</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name of the Product</Form.Label>
        <Form.Control type="text" placeholder="Product name" />
        </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Product Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
            </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" multiple />
        </Form.Group>
        <button className="btn btn-outline-primary">Upload</button>
      </div>
    )
}

export default AddProduct
