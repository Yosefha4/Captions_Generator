import React from "react";
import TransItem from "./TransItem";

const TransEditor = ({ awsTransItem, setAwsTransItem }) => {
  function updateTransItemValue(index, prop, ev) {
    const newAwsItems = [...awsTransItem];
    const newItem = {...newAwsItems[index]};
    newItem[prop] = ev.target.value;
    newAwsItems[index] = newItem;
    setAwsTransItem(newAwsItems);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 sticky top-0 bg-red-700/80 p-2 rounded-md">
        <div>From</div>
        <div>End</div>
        <div>Content</div>
      </div>
      {awsTransItem.length > 0 && (
        <div className="h-48 sm:h-auto overflow-y-scroll sm:overflow-auto">
          {awsTransItem.map((item, key) => (
            <div key={key}>
              <TransItem
                 handleStartTimeChange={ev => updateTransItemValue(key, 'start_time', ev)}
                 handleEndTimeChange={ev => updateTransItemValue(key, 'end_time', ev)}
                 handleContentChange={ev => updateTransItemValue(key, 'content', ev)}
                 item={item}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TransEditor;
