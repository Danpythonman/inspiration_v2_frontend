import api from "./inspiration_v2_api";

const login = async (email) => {
    const res = await api.post(
        "/login",
        { email: email }
    );

    return res;
}

export default login;
