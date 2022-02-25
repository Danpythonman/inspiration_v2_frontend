import api from "./inspiration_v2_api";

const changeColor = async (newColor) => {
    const res = await api.put(
        "/color",
        {
            updatedColor: newColor
        }
    );

    return res;
}

export default changeColor;
