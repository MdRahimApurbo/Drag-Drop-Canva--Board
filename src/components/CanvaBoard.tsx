import { Plus } from "lucide-react";
import { useState } from "react";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

const CanvaBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);
  return (
    <div className="m-auto flex min-h-screen w-full items-center  overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        <button
          onClick={() => {
            createColumn();
          }}
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackground border-2 border-columnBackground p-4 ring-rose-400 hover:ring-2 flex gap-2 items-center"
        >
          <Plus size={20} />
          Add Column
        </button>
      </div>
    </div>
  );

  function createColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }
  function deleteColumn(id: Id) {
    const filterColumns = columns.filter((col) => col.id !== id);
    setColumns(filterColumns);
  }
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
};

export default CanvaBoard;
