import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}
const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMouseIsOver(false);
  };
  if (editMode) {
    return (
      <div
        onClick={toggleEditMode}
        key={task.id}
        className="bg-mainBackground p-4 h-[100px] min-h-[100px] flex flex-col justify-center rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      >
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          autoFocus
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode;
            }
          }}
          onChange={(e) => {
            updateTask(task.id, e.target.value);
          }}
        >
          {task.content}
        </textarea>
      </div>
    );
  }
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="bg-mainBackground p-4 h-[100px] min-h-[100px] flex flex-col justify-center rounded-xl hover:ring-2 border border-rose-400 cursor-grab relative opacity-50 "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      key={task.id}
      className="bg-mainBackground p-4 h-[100px] min-h-[100px] flex flex-col justify-center rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative "
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className="m-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          className="text-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackground p-2 rounded opacity-60 hover:opacity-100"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
