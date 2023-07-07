import './App.css';

import Navbar from './components/Navbar.mjs';
import Carousel from './components/Carousel.mjs';
import Login from './components/Login.mjs';
import Signup from './components/Signup.mjs';
import LoginHos from './components/LoginHos.mjs';
import SignupHos from './components/SignupHos.mjs';

import {
	BrowserRouter as Router,
	Route,
	Link,
	Routes
} from 'react-router-dom';
import Home from './components/Home';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
        <Route exact path='/home' element={<Home/>} />
					<Route exact path='/' element={<Carousel />} />
					{/* <Route exact path="/" element={<Symptoms />} /> */}

					<Route exact path='/signup' element={<Signup />} />
					<Route exact path="/login" element={<Login />} />

					<Route exact path="/loginHos" element={<LoginHos />} />
					<Route exact path="/signupHos" element={<SignupHos />} />

				</Routes>
			</Router>
		</>
	);
}

export default App;
