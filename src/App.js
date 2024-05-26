import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/PublicRoute";

function App() {
	const authChecked = useAuthCheck();
	return !authChecked ? (
		<div>Loding....</div>
	) : (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>
				<Route
					path="/inbox/:id"
					element={
						<PrivateRoute>
							<Inbox />
						</PrivateRoute>
					}
				/>
				<Route
					path="/inbox"
					element={
						<PrivateRoute>
							<Conversation />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
