import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./screens/contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/login/Login";
import PrivateRoute from "./screens/login/PrivateRoute";
import UpdateProfile from "./screens/login/UpdateProfile";

function App() {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
		
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/reset-password" element={<UpdateProfile />} />
					</Routes>
				</Router>
		
		</Container>
	);
}

export default App;
