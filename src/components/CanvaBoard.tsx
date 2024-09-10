import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

const CanvaBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column>();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );
  return (
    <div className="m-auto flex min-h-screen w-full items-center  overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                />
              ))}
            </SortableContext>
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
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
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
  function updateColumn(id: Id, title: string) {
    setColumns((columns) => {
      const columnToUpdate = columns.find((col) => col.id === id);
      if (!columnToUpdate) return columns;
      columnToUpdate.title = title;
      return [...columns];
    });
  }
  function onDragStart(event: DragStartEvent) {
    // console.log(event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }
  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(active, over);
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
};

export default CanvaBoard;
