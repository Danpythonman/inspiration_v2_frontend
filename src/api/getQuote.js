import api from "./inspiration_v2_api";

const getQuote = async () => {
    const res = await api.get("/quote");

    return res;
}

export default getQuote;
