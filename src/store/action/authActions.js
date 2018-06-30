export class AuthAction {
    static LOGIN = "LOGIN";
    static LOGOUT = "LOGOUT";
    static VERIFIEDEMAIL = "VERIFIEDEMAIL";
    static VERIFIEDUSER = 'VERIFIEDUSER';


    static userLogin = (payload) => ({
        type: AuthAction.LOGIN,
        payload
    })
    static logout = (payload) => ({
        type: AuthAction.LOGOUT,
        payload
    })
    static verifyemail = (payload) => ({
        type: AuthAction.VERIFIEDEMAIL
    })
    
    static verifiedUser = (payload) => {
        type: AuthAction.VERIFIEDUSER,
            payload
    }
}