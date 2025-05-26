import React, { useState } from 'react';
import { accordionData } from './data';

const App = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(accordionId) {
    setSelected(accordionId === selected ? null : accordionId);
  }

  function handleMultipleSelection(accordionId) {
    const copyMultiple = [...multiple];
    const index = copyMultiple.indexOf(accordionId);

    if (index === -1) {
      copyMultiple.push(accordionId);
    } else {
      copyMultiple.splice(index, 1);
    }

    setMultiple(copyMultiple);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Accordion</h1>
      
      <button
        onClick={() => {
          setEnableMultipleSelection(!enableMultipleSelection);
          setSelected(null);
          setMultiple([]);
        }}
        className="block mx-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {enableMultipleSelection ? 'Disable' : 'Enable'} Multiple Selection
      </button>

      {accordionData && accordionData.length > 0 ? (
        accordionData.map((data) => {
          const isOpen = enableMultipleSelection
            ? multiple.includes(data.id)
            : selected === data.id;

          return (
            <div
              key={data.id}
              className="border border-gray-300 rounded-lg shadow-sm transition-all duration-300"
            >
              <div
                onClick={() =>
                  enableMultipleSelection
                    ? handleMultipleSelection(data.id)
                    : handleSingleSelection(data.id)
                }
                className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 rounded-t-lg"
              >
                <h2 className="text-lg font-medium text-gray-800">{data.title}</h2>
                <span className="text-xl font-bold text-gray-600">
                  {isOpen ? '-' : '+'}
                </span>
              </div>

              {isOpen && (
                <div className="p-4 bg-white text-gray-700">{data.content}</div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No data found.</p>
      )}
    </div>
  );
};

export default App;
