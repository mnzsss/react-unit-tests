import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";

type ListProps = {
  initialItems: string[];
};

export function List({ initialItems }: ListProps) {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState(initialItems);

  async function addToList() {
    setTimeout(() => {
      if (!newItem) return;

      setList((old) => [...old, newItem]);
      setNewItem("");
    }, 500);
  }

  function removeItem(item: string) {
    setList((old) => old.filter((i) => i !== item));
  }

  function resetList() {
    setList(initialItems);
  }

  return (
    <div className="bg-slate-900 w-screen min-h-screen flex items-center justify-center">
      <div className="w-2/5">
        <button
          data-testid="reset-button"
          className="bg-slate-800 mb-6 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-all ease duration-200"
          onClick={resetList}
        >
          <p className="text-xs">Reset</p>
        </button>

        <div className="flex items-center">
          <input
            data-testid="input-field"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New Item..."
            className="h-full w-full text-xs p-2 rounded-md bg-slate-800 text-white"
          />

          <button
            data-testid="add-button"
            className="bg-cyan-500 ml-2 text-white px-4 py-2 rounded-md hover:bg-cyan-800 transition-all ease duration-200"
            onClick={addToList}
          >
            <p className="text-xs font-bold">Add</p>
          </button>
        </div>

        <div className="my-6 h-px w-full bg-slate-600 rounded-md" />

        <ul data-testid="list-items" className="flex flex-wrap gap-2">
          {list.map((item) => (
            <li
              className="flex-auto shadow-md bg-slate-800 rounded-md p-2 flex items-center justify-center"
              key={item}
            >
              <button
                data-testid="remove-button"
                onClick={() => removeItem(item)}
                className="text-xs p-1 rounded-md mr-2 bg-slate-700 hover:bg-slate-900 transition-all ease duration-400"
              >
                <TrashIcon className="h-2 w-2 text-cyan-500 hover:text-cyan-400 transition-all ease duration-400" />
              </button>

              <p className="text-xs font-bold text-slate-200">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
