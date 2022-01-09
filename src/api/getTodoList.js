import api from "./inspiration_v2_api";

const getTodoList = async () => {
    const res = await api.get("/tasks");

    return res;
}

export default getTodoList;
