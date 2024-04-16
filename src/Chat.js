import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
import GifRoundedIcon from "@mui/icons-material/GifRounded";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
// import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import firebase from "firebase/compat/app";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);
  
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const toggleEmojiPicker = () => {
  //   setShowEmojiPicker(!showEmojiPicker);
  // };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__msgs">
        {messages.map((message) => (
          <Message 
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <ControlPointOutlinedIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Massage #${channelName?channelName:""}`}
          />
          <button
            disabled={!channelId || !input}
            // disabled={!input}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Msg
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardRoundedIcon fontSize="large" />
          <GifRoundedIcon fontSize="large" />
          {/* <EmojiEmotionsOutlinedIcon fontSize="large" /> */}
          <EmojiEmotionsOutlinedIcon
            fontSize="large"
            // onClick={toggleEmojiPicker}
          />
          {/* {showEmojiPicker && (
            <EmojiPicker onEmojiClick={(emoji) => setInput(input + emoji)} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Chat;
