import { AuthAction } from '../actions/authActions'
const initialState = {
    isLoggedIn: false,
    detail: {},
    verified: true,
    resset: false,
}

export default function (state = initialState, action) {
    console.log(action.payload)

    switch (action.type) {

        case AuthAction.LOGIN:
            return { ...state, isLoggedIn: true, detail: action.payload, verified: true };
            break;
        case AuthAction.LOGOUT:
            return {
                isLoggedIn: false
            }
            break;
        case AuthAction.VERIFIEDEMAIL:
            return {
                ...state, verified: false
            }
            break;
        case AuthAction.RESSETPASSWORD:
            return {
                ...state, resset: true, forgetpass: action.payload
            }
        default:
            return state;
    }
}