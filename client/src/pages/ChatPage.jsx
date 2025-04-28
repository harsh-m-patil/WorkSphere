import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { useChatStore } from '@/store/chatStore';
import useAuthStore from '@/store/authStore';
import { cn } from '@/lib/utils';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/outline';
import { getDateWithTime } from '@/utils/convertDate';

const ChatPage = () => {
  const { username } = useParams();
  const {
    users,
    messages,
    selectedUser,
    isUsersLoading,
    isMessagesLoading,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const [text, setText] = useState('');
  const connectSocket = useAuthStore((state) => state.connectSocket);
  const disconnectSocket = useAuthStore((state) => state.disconnectSocket);
  const onlineUsers = useAuthStore((state) => state.onlineUsers);
  const currentUser = useAuthStore((state) => state.user);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Load all users on mount
  useEffect(() => {
    getUsers();
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Subscribe/unsubscribe from messages
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser]);

  // Auto select user from URL
  useEffect(() => {
    if (users.length > 0 && username) {
      const found = users.find((u) => u.userName === username);
      if (found) {
        setSelectedUser(found);
      }
    }
  }, [username, users]);

  // Socket connection
  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ text });
    setText('');
  };

  const isUserOnline = (id) => onlineUsers?.includes(id);

  const handleSelect = (u) => {
    setSelectedUser(u);
    navigate(`/chat/${u.userName}`);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-muted/30 p-4 dark:bg-muted/50">
        <h2 className="mb-4 text-xl font-semibold">Chats</h2>
        {isUsersLoading ? (
          <div className="flex h-24 items-center justify-center">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <ul className="max-h-full space-y-1 overflow-y-auto">
            {users
              .filter((u) => u._id !== currentUser?._id)
              .map((u) => (
                <li
                  key={u._id}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition',
                    selectedUser?._id === u._id
                      ? 'bg-primary text-white'
                      : 'hover:bg-muted'
                  )}
                  onClick={() => handleSelect(u)}
                >
                  <UserCircleIcon className="h-6 w-6 text-muted-foreground" />
                  <div className="flex-1">{u.userName}</div>
                  {isUserOnline(u._id) && (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  )}
                </li>
              ))}
          </ul>
        )}
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-1 flex-col">
        {selectedUser ? (
          <Card className="flex h-full flex-col rounded-none border-none shadow-none">
            {/* Header */}
            <div className="flex items-center gap-3 border-b bg-muted/60 p-4">
              <UserCircleIcon className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">{selectedUser.userName}</p>
                {isUserOnline(selectedUser._id) && (
                  <p className="text-xs text-green-600">Online</p>
                )}
              </div>
            </div>

            {/* Messages */}
            <CardContent className="flex-1 overflow-hidden p-4">
              <ScrollArea className="h-full" viewportRef={scrollRef}>
                {isMessagesLoading ? (
                  <div className="flex h-32 items-center justify-center">
                    <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : messages.length === 0 ? (
                  <p className="mt-24 text-center text-muted-foreground">
                    Say hi to <strong>{selectedUser.userName}</strong>
                  </p>
                ) : (
                  <div className="space-y-2">
                    {messages.map((msg, idx) => {
                      const isMine = msg.senderId === currentUser._id;
                      return (
                        <div
                          key={idx}
                          className={cn(
                            'flex',
                            isMine ? 'justify-end' : 'justify-start'
                          )}
                        >
                          <div
                            className={cn(
                              'relative max-w-[70%] rounded-xl px-4 py-2 shadow',
                              isMine
                                ? 'rounded-br-none bg-green-100 text-black'
                                : 'rounded-bl-none bg-muted text-foreground'
                            )}
                          >
                            <p className="break-words text-sm">{msg.text}</p>
                            <small className="mt-1 block text-right text-xs opacity-70">
                              {getDateWithTime(msg.createdAt)}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>

            {/* Input Area */}
            <div className="flex items-center gap-2 border-t bg-muted/60 px-4 py-3">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 rounded-full"
              />
              <Button
                onClick={handleSend}
                size="icon"
                disabled={!text.trim()}
                className="rounded-full"
              >
                <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
              </Button>
            </div>
          </Card>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
            <UserCircleIcon className="mb-4 h-16 w-16" />
            <p>Select a user to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
