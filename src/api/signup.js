import api from "./inspiration_v2_api";

const signup = async (email) => {
    const res = await api.post(
        "/signup",
        { email: email }
    );

    return res;
}

export default signup;
