import api from "./inspiration_v2_api";

const deleteTask = async (taskId) => {
    const res = await api.delete(
        "/task",
        {
            data: {
                taskId: taskId
            }
        }
    );

    return res;
}

export default deleteTask;
