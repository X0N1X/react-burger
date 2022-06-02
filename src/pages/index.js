import React from "react";
import { PageMain } from "./main";
import { PageRegistration } from "./registration";
import { PageLogin } from "./login";
import { PageLogout} from "./logout";
import { PageProfile } from "./profile";
import { PageReset } from "./reset";
import { PageForgot } from "./forgot";
import { Page404 } from "./404";
import { PageIngredientDetail } from "./ingredient-detail";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/store";
import { getUser } from "../services/actions/user";
import { Routes, Route, useLocation } from 'react-router-dom';
import { PublicOnlyRoute, ProtectedRoute } from "../services/routes";
import IngredientDetailsModal from "../components/ingredients-details/ingredient-details-modal";
import App from '../components/app/app'
import { checkAccessToken } from "../services/urls";

const Pages = () => {
	const dispatch   = useDispatch(),
		  location   = useLocation(),
		  background = location?.state?.background;

	const { isAuth } = useSelector(state => state.user);

	const isAccessToken = checkAccessToken();

	React.useEffect(() => {
		dispatch(getIngredients());
		if (isAuth || isAccessToken) {
			dispatch(getUser());
		}
	}, [dispatch, isAccessToken, isAuth]);

	return (
		<>
			<Routes location={background || location}>
				<Route path = "/" element={<App/>}>
					<Route path="login" element={<PublicOnlyRoute outlet={<PageLogin/>}/>}/>
					<Route path="logout" element={<ProtectedRoute outlet={<PageLogout/>}/>}/>
					<Route path="register" element={<PublicOnlyRoute outlet={<PageRegistration/>}/>}/>
					<Route path="forgot-password" element={<PublicOnlyRoute outlet={<PageForgot/>}/>}/>
					<Route path="reset-password" element={<PublicOnlyRoute outlet={<PageReset/>}/>}/>
					<Route path="profile" element={<ProtectedRoute  outlet={<PageProfile/>}/>}>
						<Route path="orders" element={<Page404/>}/>
					</Route>
					<Route index element={<PageMain/>}/>
					<Route path="/ingredients/:ingredientId" element={<PageIngredientDetail/>}/>
					<Route path="*" element={<Page404/>}/>
				</Route>
			</Routes>
			{background && (
				<Routes>
					<Route path="/ingredients/:ingredientId" element={<IngredientDetailsModal/>}/>
				</Routes>
			)}
		</>
	)
};

export default Pages