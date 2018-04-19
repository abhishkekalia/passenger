import {combineReducers} from "redux";
import auth from "../screens/RegisterAccount/auth.reducer";
import dashboard from "../app/dashboard/dashboard.reducer";
import identity from "../app/auth/identity.reducer";
import storage from "../app/storage/storage.reducer";

const rootReducer = combineReducers({
	auth,
	dashboard,
	identity,
	storage
});

export default rootReducer;
