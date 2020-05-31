import React from "react";

const Navigation = ({ onRouteChange, isSignIn}) => {
    if (isSignIn) {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link black underline pa3 pointer'>Sign Out</p>
            </div>
        )
    } else {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link black underline pa3 pointer'>Sign Up</p>
            </div>
        )
    }
   
}

export default Navigation