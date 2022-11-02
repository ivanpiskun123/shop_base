import { Form } from "react-bootstrap"
import { uploadFile } from "react-s3"
import { useDispatch } from "react-redux"
import { imagesAdded } from "./imagesSlice"
import {useState} from "react";

const Images = ({ handleImages }) => {
	const S3_BUCKET = "shoppaige"

	const REGION = "us-east-1"
	const dispatch = useDispatch()
	const config = {
		bucketName: S3_BUCKET,
		dirName: "images",
		region: REGION,
		accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
		secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
		s3Url: "http://shoppaige.s3-website-us-east-1.amazonaws.com",
	}
	const [ url, setUrl ] = useState("");

	function upload(e) {

		const data = new FormData()
		data.append("file", e.target.files[0])
		data.append("upload_preset", "zzpmbswm")
		data.append("cloud_name","drntpsmxs")
		fetch("https://api.cloudinary.com/v1_1/drntpsmxs/image/upload",{
			method:"post",
			body: data
		})
			.then(resp => resp.json())
			.then(data => {
				setUrl(data.url)
				handleImages(data.url)
				dispatch(imagesAdded(data.url))
			})
			.catch(err => console.log(err))

		// uploadFile(e.target.files[0], config)
		// 	.then((data) => {
		// 		handleImages(data.location)
		// 		dispatch(imagesAdded(data.location))
		// 	})
		// 	.catch((err) => console.log(err))
	}

	return (
		<div>
			<Form.Group controlId="formFileMultiple" className="mb-3">
				<Form.Label>Image 1</Form.Label>
				<Form.Control type="file" name="images" multiple onChange={upload} />
			</Form.Group>
			<Form.Group controlId="formFileMultiple" className="mb-3">
				<Form.Label>Image 2</Form.Label>
				<Form.Control type="file" multiple name="images" onChange={upload} />
			</Form.Group>
			<Form.Group controlId="formFileMultiple" className="mb-3">
				<Form.Label>Image 3</Form.Label>
				<Form.Control type="file" multiple name="images" onChange={upload} />
			</Form.Group>
		</div>
	)
}
export default Images
