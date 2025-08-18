import type { TaskModel } from "../models/TaskModel"

export const getNextCycleType = (currentCycle: number): TaskModel['type'] => {
    if (currentCycle % 8 === 0)
        return 'longBreakTime';
    else if (currentCycle % 2 === 0)
        return 'shortBreakTime';
    else
        return 'workTime';
}