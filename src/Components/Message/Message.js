import React from 'react'
import { formatRelative } from 'date-fns'

const Message = ({
    created_at = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return <div className="message">
        <div className="row align-items-start chat">
            {photoURL ? (
                <div className="col-md-1 col-1">
                    <div className="avatar">
                        <img src={photoURL} alt={displayName} className="img-fluid"
                        />
                    </div>
                </div>
            ) : null}
            {/* {displayName ? <p>{displayName}</p> : null} */}
            <div className="col-md-10 col-10 chat-message-container">
                <p className="chat-message">{text}</p>
            </div>
            {created_at?.seconds ? (
                <span className="chat-time">
                    {formatRelative(new Date(created_at.seconds * 1000), new Date())}
                </span>
            ) : null}
        </div>
    </div>
}

export default Message