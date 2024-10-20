import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/PublicRoute";
import VerifyEmail from "./pages/VerifyEmail";
import GoogleAuthSuccess from "./features/auth/GoogleAuth";

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
						<Register />
					}
				/>
				<Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
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
				<Route
					path="/verify-email"
					element={
						<VerifyEmail/>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
