import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Filter from "./Filter"

const Searchbar = ({ search, setSearch }) => {
	return (
		<Container style={{ marginTop: "75px" }}>
			<Row>
				<Col sm={4}>
					<Filter />
				</Col>
				<Col sm={4}>

				</Col>
				<Col>
					<input
						className="form-control"
						type="text"
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						aria-label="Search"
					/>
				</Col>
			</Row>
			<hr/>
		</Container>
	)
}

export default Searchbar
