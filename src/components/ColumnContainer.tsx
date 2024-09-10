import { Trash2 } from "lucide-react";
import { Column, Id } from "../types";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = (props: ColumnContainerProps) => {
  const { column, deleteColumn } = props;
  return (
    <div className="bg-columnBackground w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div
        className="bg-mainBackground text-md h-[60px] cursor-grab rounded-none rounded-b-none p-3 font-bold border-columnBackground border-4 flex justify-between items-center"
        key={column.id}
      >
        <div className="flex items-center gap-2">
          <div className="flex justify-between items-center bg-columnBackground px-2 py-1 text-sm">
            0
          </div>
          {column.title}
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
