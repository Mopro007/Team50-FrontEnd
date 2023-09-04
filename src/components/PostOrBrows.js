import React from 'react';

const PostOrBrows = ({ postOrbrows }) => {
  const handleChoice = (choice) => {
    postOrbrows(choice);
  };

  return (
    <div className="PostOrBrows">
      <button onClick={() => handleChoice('post')} className='postProjectButton'>Post a Project</button>
      <button onClick={() => handleChoice('browse')} className='browseProjectsButton'>Browse Projects</button>
    </div>
  );
};

export default PostOrBrows;