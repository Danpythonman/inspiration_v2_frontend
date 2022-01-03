import api from "./inspiration_v2_api";

const getImage = async () => {
    const res = await api.get("/image");

    return res;
}

export default getImage;
