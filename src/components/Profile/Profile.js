import React from 'react';


const Profile = props => {
    return(
        <div className='white f4'>
            <p>Welcome {props.userInfo.name} To Face Detection Web Application.</p>
            <p>All You Need To Do Is To Get An Image Address And Paste it in The Textbox Below.</p>
        </div>
    )
}

export default Profile
