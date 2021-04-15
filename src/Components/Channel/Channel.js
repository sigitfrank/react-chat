import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import Message from '../Message/Message'
function Channel({ user = null, db = null }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const { uid, displayName, photoURL } = user
    useEffect(() => {
        if (db) {
            const unsubscribe = db
                .collection('messages')
                .orderBy('created_at')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => (
                        {
                            ...doc.data(),
                            id: doc.id
                        }
                    ))
                    setMessages(data)
                })

            return unsubscribe
        }
    }, [db])


    const handleOnChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setNewMessage('')
        if (db) {
            db.collection('messages').add({
                text: newMessage,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
    }

    return <>
        <ul>
            {messages.map(message => (
                <li key={message.id}>
                    <Message {...message} />
                </li>
            ))}
        </ul>
        <form onSubmit={handleOnSubmit} className="text-right">
            <input
                className="form-control message"
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Type your message here..."
            />
            <button type="submit" className="btn btn-send my-2" disabled={!newMessage}>Send</button>
        </form>
    </>
}

export default Channel
