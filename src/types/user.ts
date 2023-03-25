import Task from "./task";

type User = {
    email: string;
    password: string;
    tasks: Task[];
};

export default User;
