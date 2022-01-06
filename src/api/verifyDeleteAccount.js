import api from "./inspiration_v2_api";

const verifyDeleteAccount = async (verificationCode) => {
    const res = await api.delete(
        "/delete/verify",
        {
            data: {
                verificationCode: verificationCode
            }
        }
    );

    return res;
}

export default verifyDeleteAccount;
