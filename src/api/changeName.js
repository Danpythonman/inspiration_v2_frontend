import api from "./inspiration_v2_api";

const changeName = async (newName) => {
    const res = await api.put(
        "/name",
        {
            updatedName: newName
        }
    );

    return res;
}

export default changeName;
