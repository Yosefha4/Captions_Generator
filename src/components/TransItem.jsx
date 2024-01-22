import React, { useState } from "react";

const TransItem = ({
  item,
  handleStartTimeChange,
  handleEndTimeChange,
  handleContentChange,
}) => {
  //   const [startSec, setStartSec] = useState(item.start_time);
  //   const [endSec, setEndSec] = useState(item.end_time);
  //   const [content, setContent] = useState(item.content);

  if(!item){
    return "";
  }
  return (
    <div className="my-1 grid grid-cols-3 gap-1 items-center">
      <input
        className="bg-white/20  p-1 rounded-md"
        type="text"
        value={item.start_time}
        onChange={handleStartTimeChange}
      />
      <input
        className="bg-white/20  p-1 rounded-md"
        type="text"
        value={item.end_time}
        onChange={handleEndTimeChange}
      />

      <input
        type="text"
        className="bg-white/20  p-1 rounded-md"
        value={item.content}
        onChange={handleContentChange}
      />
      {/* <span>{item.content}</span> */}
    </div>
  );
};

export default TransItem;
