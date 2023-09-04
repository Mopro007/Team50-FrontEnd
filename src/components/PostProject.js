import React from "react";

const PostProject = ({Post_Project}) => {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            name: event.target.name.value,
            description: event.target.description.value
          };
        Post_Project(formData);
    };
    
    return (
        <div className="PostProject container">
            <h2>Post a Project</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="project name" maxLength={40}/>
                <textarea name="description" placeholder="project description" maxLength={350} />
                <input type="submit" placeholder="submit" />
            </form>
        </div>
    );
}

export default PostProject;