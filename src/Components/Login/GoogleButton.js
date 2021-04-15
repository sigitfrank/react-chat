import React from 'react'

function GoogleButton({ onClick = null, children = null, status = 'signout' }) {
    if (status === 'signout')
        return <button onClick={onClick} className={`btn btn-signout`}>
            {children}
        </button>
}

export default GoogleButton
