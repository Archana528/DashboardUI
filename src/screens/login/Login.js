import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import extropyLogo from '../../assets/images/ExtropyDataLabsLogoFinal.png'

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		//try {
			setError("");
			setLoading(true);
      // if(emailRef.current.value === "archana@extropy.com"){
      //   return true 
      // }
			//await login(emailRef.current.value, passwordRef.current.value);

			navigate("/");
		// } catch {
		// 	setError("Failed to log in");
		// }

		setLoading(false);
	}

	

	return (
		<div className="w-100" style={{ maxWidth: "400px" }}>
      <div>
        <img width={350} height={200} src={extropyLogo} />  
        <h2 class="text-center mb-4" style={{color:"#1B74BB"}}>PriceAware</h2> 
      </div>
      
			<Card>
				<Card.Body>
					<h3 className="text-center mb-4" style={{color:"#1B74BB"}}>Log In</h3>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label style={{color:"#1B74BB"}}>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password" className="pb-3" >
							<Form.Label style={{color:"#1B74BB"}}>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">
							Log In
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/reset-password">Change Password?</Link>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}
