import api from "./inspiration_v2_api";

const logOutOfAllDevices = async () => {
    const res = await api.post("/logout");

    return res;
}

export default logOutOfAllDevices;
