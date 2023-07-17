export default function taskReducer(task, action) {
  switch (action.type) {
    case "adding": {
      return [
        ...task,
        {
          id: action.id,
          title: action.title,
          done: false,
          time: action.time,
          date: action.date,
          dateISO: action.dateISO,
          endDate: action?.endDate
        }
      ];
    }
    case "changed": {
      return task.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return task.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error(`error occured ${action.type}`);
    }
  }
}
