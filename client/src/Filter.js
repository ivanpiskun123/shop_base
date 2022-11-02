import { Form } from "react-bootstrap"
import { productFiltered } from "./features/products/productsSlice"
import { useDispatch } from "react-redux"
import CategoriesService from "./API/CategoriesService";
import React, {useEffect, useState} from "react";

function Filter() {
	const dispatch = useDispatch()
	function handleChange(e) {
		fetch(`/productsCategory/${parseInt(e.target.value)}`)
			.then((resp) => resp.json())
			.then((data) => {
				dispatch(productFiltered(data))
			})
	}
	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		try {
			const response = await CategoriesService.getAll();
			console.log(response.data)
			setCategories(response.data)
		} catch (e) {
			console.log(e);
		}
	}

	useEffect( ()=>{
			fetchCategories();
		}
		,[] )


	return (
		<Form.Select aria-label="Default select example" onChange={handleChange}>
			<option disabled value="" selected>Select category</option>
			{categories.map( (n) => (
				<option key={n.id} value={n.id}>
					{n.name}
				</option>
			))
			}
		</Form.Select>
	)
}

export default Filter
