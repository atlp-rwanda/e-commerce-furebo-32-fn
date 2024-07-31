import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchMessages, sendMessage, deleteMessage } from '../redux/chatSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DeleteOutlined } from '@mui/icons-material';

dayjs.extend(relativeTime);

const { TextArea } = Input;

// Function to format time
const formatTime = (time: string) => {
  try {
    const now = dayjs();
    const parsedDate = dayjs(time);
    const diffInMinutes = now.diff(parsedDate, 'minute');

    if (!parsedDate.isValid()) {
      return 'Invalid time'; 
    }

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    if (diffInMinutes < 1440) return `${now.diff(parsedDate, 'hour')} hour${now.diff(parsedDate, 'hour') === 1 ? '' : 's'} ago`;
    if (diffInMinutes < 43200) return `${now.diff(parsedDate, 'day')} day${now.diff(parsedDate, 'day') === 1 ? '' : 's'} ago`;
    if (diffInMinutes < 525600) return `${now.diff(parsedDate, 'month')} month${now.diff(parsedDate, 'month') === 1 ? '' : 's'} ago`;
    return `${now.diff(parsedDate, 'year')} year${now.diff(parsedDate, 'year') === 1 ? '' : 's'} ago`;
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

  const handleDeleteMessage = (messageId: string) => {
      dispatch(deleteMessage(messageId) as any);
  };

  const handleMentionClick = (mention: string) => {
    setMessageContent(prevContent => `${prevContent}@${mention} `); 
  };

  const renderMessage = (content: string) => {
    const mentionPattern = /@(\w+)/g;
    const parts = content.split(mentionPattern);
    
    return parts.map((part, index) => 
      index % 2 === 1 ? (
        <span key={index} className="mention" onClick={() => handleMentionClick(part)}>
          @{part}
        </span>
      ) : part
    );
  };

  const role = window.localStorage.getItem('role');

  return (
    <div className='flex justify-center'>
        <div className="chat-container">
        <h1>You can chat with The Buyers and Sellers Here!</h1>
        <List
          className="chat-list"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={item => (
            <List.Item key={item.id}>
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
              {role === 'admin' && (
                <DeleteOutlined 
                  style={{ color: 'red', cursor: 'pointer' }} 
                  onClick={() => handleDeleteMessage(item.id)}
                />
              )}
            </List.Item>
          )}
        />
        <div className="chat-input">
          <TextArea
            rows={4}
            value={messageContent}
            onChange={(e:any) => setMessageContent(e.target.value)}
            placeholder="Type your message here!"
          />
          <Button className="message-button" type="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
