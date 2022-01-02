import api from "./inspiration_v2_api";

const verifyLogin = async (email, verificationCode) => {
    const res = await api.post(
        "/login/verify",
        {
            email: email,
            verificationCode: verificationCode
        }
    );

    return res;
}

export default verifyLogin;
