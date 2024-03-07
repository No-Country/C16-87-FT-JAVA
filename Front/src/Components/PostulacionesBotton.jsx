// PostulacionButton.js
// eslint-disable-next-line no-unused-vars
import React from 'react';

const PostulacionButton = ({ onPostulate }) => {
  const handlePostulateClick = () => {
    if (onPostulate) {
      onPostulate();
    }
  };

  return (
    <button
      className="bg-green-500 text-white py-2 px-4 rounded mx-auto block"
      onClick={handlePostulateClick}
    >
      Postularme
    </button>
  );
};

export default PostulacionButton;

