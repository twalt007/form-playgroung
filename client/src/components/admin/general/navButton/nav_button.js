import React from 'react'

const NavButton = props => {
    const {text, buttonClasses = "large-button", url=null, mainHistory} = props;
    
    function reroute(){
        mainHistory.push(url);
    }
    return (
        <div className = "button-container">
            <div className = {`${buttonClasses} + fat-border`} onClick={reroute}>{text}</div>                
        </div>
    )
}

export default NavButton;




