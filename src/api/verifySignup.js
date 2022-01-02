import api from "./inspiration_v2_api";

const verifySignup = async (email, name, verificationCode) => {
    const res = await api.post(
        "/signup/verify",
        {
            email: email,
            name: name,
            verificationCode: verificationCode
        }
    );

    return res;
}

export default verifySignup;
