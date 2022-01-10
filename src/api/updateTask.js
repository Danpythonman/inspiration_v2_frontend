import api from "./inspiration_v2_api";

const updateTask = async (taskId, task) => {
    const res = await api.put(
        "/task",
        {
            taskId: taskId,
            task: task
        }
    );

    return res;
}

export default updateTask;
