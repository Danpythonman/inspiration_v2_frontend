import api from "./inspiration_v2_api";

const updateTaskCompletion = async (taskId, completed) => {
    const res = await api.put(
        "/task/complete",
        {
            taskId: taskId,
            completed: completed
        }
    );

    return res;
}

export default updateTaskCompletion;
