import api from "./inspiration_v2_api";

const getNameAndEmail = async () => {
    const res = await api.get("/user");

    return res;
}

export default getNameAndEmail;
