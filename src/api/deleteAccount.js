import api from "./inspiration_v2_api";

const deleteAccount = async () => {
    const res = await api.post("/delete");

    return res;
}

export default deleteAccount;
