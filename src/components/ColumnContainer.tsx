import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Column, Id } from "../types";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

const ColumnContainer = (props: ColumnContainerProps) => {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
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
        className="bg-columnBackground opacity-40 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col "
      />
    );
  }

  return (
    <div
      className="bg-columnBackground w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ref={setNodeRef}
      style={style}
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-mainBackground text-md h-[60px] cursor-grab rounded-none rounded-b-none p-3 font-bold border-columnBackground border-4 flex justify-between items-center"
        key={column.id}
      >
        <div className="flex items-center gap-2">
          <div className="flex justify-between items-center bg-columnBackground px-2 py-1 text-sm">
            0
          </div>
          {!editMode ? (
            column.title
          ) : (
            <input
              className="bg-black focus:border-rose-500 border-rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditMode(false);
                }
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
    </div>
  );
};

export default ColumnContainer;
