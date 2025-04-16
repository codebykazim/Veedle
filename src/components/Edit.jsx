  import React, { useState } from "react";

  function Edit({ initialContent, onCancel, onSave }) {
    const [editedContent, setEditedContent] = useState(initialContent);

    const handleSave = () => {
      onSave(editedContent);
    };

    return (
      <div className="w-full text-sm">
        <input
          className="bg-[#222222] outline-none border-b w-3/4 p-2 focus:border-purple-500 transition-colors"
          value={editedContent}
          autoFocus
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <div className="space-x-4 mt-3 w-3/4 inline-flex justify-end items-center">
          <button
            className="bg-[#222222] py-1.5 px-4 font-normal rounded-lg hover:bg-black transition-colors cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#222222] py-1.5 px-4 font-normal rounded-lg hover:bg-black transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  export default Edit;
