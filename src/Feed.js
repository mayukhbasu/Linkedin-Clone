import CreateIcon from "@material-ui/icons/Create";
import React, { useEffect, useState } from 'react';
import './Feed.css';
import InputOption from "./InputOptions";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import { db } from "./firebase";
import firebase from 'firebase';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');
    const sendPost = (e) => {
        e.preventDefault();
        db.collection("posts").add({
            name: 'Bubul',
            description: 'Test description',
            message: input,
            photoUrl: '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        setInput("");
    }
    useEffect(() => {
        db.collection("posts")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );
      }, []);
    
    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon/>
                    <form>
                        <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                <InputOption
                Icon={CalendarViewDayIcon}
                title="Write article"
                color="#7FC15E"
            />
                </div>
            </div>
            {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
            
        </div>
    );
};

export default Feed;