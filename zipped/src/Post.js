import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar"

function Post() {
    return (
        <div className="post">
            <div classname = "post_header">
            <Avatar
            className="post_avatar"
            alt='EmpoweredGirl'
            src="/static/images/avatar/1.jpg"
            />
            <h3>Username</h3>
            </div>
            

            <img className="post_image" src="https://projectwomanohio.files.wordpress.com/2014/03/empowerment.jpg" alt></img>
            
            <h4 className="post_text"><strong>EmpoweredGirl: </strong> Feeling Empowered</h4>

        </div>
    )
}

export default Post


