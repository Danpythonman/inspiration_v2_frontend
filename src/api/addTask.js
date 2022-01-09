import api from "./inspiration_v2_api";

const addTask = async (task) => {
    const res = await api.post(
        "/task",
        { task: task }
    );

    return res;
}

export default addTask;
