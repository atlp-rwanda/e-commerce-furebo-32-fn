import React, { useState, useEffect } from 'react';
import { List, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchMessages, sendMessage } from '../redux/chatSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TextArea from 'antd/es/input/TextArea';

dayjs.extend(relativeTime);

// Function to format time
const formatTime = (time: string) => {
  try {
    const now = dayjs();
    const parsedDate = dayjs(time);
    const diffInMinutes = now.diff(parsedDate, 'minute');

    if (!parsedDate.isValid()) {
      return 'Invalid time'; 
    }

    if (diffInMinutes < 1) {
      return 'Just now';
    } 
    else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } 
    else if (diffInMinutes < 1440) { 
      const diffInHours = now.diff(parsedDate, 'hour');
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }
    else if (diffInMinutes < 43200) { 
      const diffInDays = now.diff(parsedDate, 'day');
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
    else if (diffInMinutes < 525600) { 
      const diffInMonths = now.diff(parsedDate, 'month');
      return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
    } 
    else {
      const diffInYears = now.diff(parsedDate, 'year');
      return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
    }
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid time'; 
  }
};

// Chat component
export const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const user = useSelector((state: RootState) => state.user);
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      dispatch(sendMessage({ content: messageContent, userId: user.id }));
      setMessageContent('');
    }
  };

  const handleMentionClick = (mention: string) => {
    setMessageContent(prevContent => `${prevContent}@${mention} `); 
  };

  const renderMessage = (content: string) => {
    const mentionPattern = /@(\w+)/g;
    const parts = content.split(mentionPattern);
    const elements = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i % 2 === 1) {
        
        elements.push(
          <span key={i} className="mention" onClick={() => handleMentionClick(part)}>
            @{part}
          </span>
        );
      } else {
        elements.push(part);
      }
    }

    return elements;
  };

  return (
    <div className="chat-container">
      <h1>You can chat with The Buyers and Sellers Here!</h1>
      <List
        className="chat-list"
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item.name[0]}</Avatar>}
              title={
                <>
                  {item.name} 
                  <span className="time-text">
                    ({formatTime(item.createdAt)}) 
                  </span>
                </>
              }
              description={<div>{renderMessage(item.content)}</div>}
            />
           
          </List.Item>
        )}
      />
      <div className="chat-input">
        <TextArea
          rows={4}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message here!"
        />
        <Button className="message-button" type="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};
