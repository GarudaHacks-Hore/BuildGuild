'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SurveyChat from './SurveyChat';
import axios from 'axios';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/auth-js';

interface Message {
  id: number;
  role: string;
  content: string;
  created_at: Date;
}

interface SurveyRoomProps {
  setPhase: (phase: number) => void;
}

const SurveyRoom: React.FC<SurveyRoomProps> = ({ setPhase }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `

    Hello friend! I'm excited to help you connect with people working on fascinating projects.
    Let's kick off your journey right here. Creating your profile will only take a minute, I promise.
    If you run into any issues, feel free to email us at info.buildguild@gmail.com.
    Okay, first up:
    
    What's your name and where are you based? Please include your city and country.
    
    (For example, "Hi, I'm Gerald from South Tangerang, Indonesia.")
    
    `,
      created_at: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [phase, updatePhase] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [milestone, setMilestone] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: newMessage,
      created_at: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage('');

    console.log(
      messages
        .filter((msg) => msg.id != 1)
        .map((message) => ({ role: message.role, content: message.content }))
    );

    setIsLoading(true);
    const response = await axios.post('http://172.25.117.40:8000/registration', {
      prompt: newMessage,
      phase: phase,
      conversation_history: [...messages, userMessage]
        .filter((msg) => msg.id != 1)
        .map((message) => ({ role: message.role, content: message.content })),
    });
    setIsLoading(false);

    if (phase === 1) {
      setName(response.data.summary);
    } else if (phase === 3) {
      setProject(response.data.history[2].content);
      setMilestone(response.data.history[4].content);
    }

    const assistantMessage = {
      id: messages.length + 2,
      role: 'assistant',
      content: response.data.answer,
      created_at: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    updatePhase(phase + 1);
    setPhase(phase + 1);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const submitProfile = async () => {
      if (phase === 4 && user) {
        const { error } = await supabase
          .from('profiles')
          .update({ name: name, current_project: project, current_project_milestone: milestone })
          .eq('email', user?.email);
        if (error) {
          console.error('Error inserting profile: ', error);
        }
      }
    };
    submitProfile();
  }, [phase, user, name, project, milestone]);

  return (
    <>
      <h2 className='font-bold'>Initial Survey</h2>
      <div className='border rounded-lg p-4 flex-grow overflow-y-auto bg-gray-50'>
        {messages.map((message) => (
          <SurveyChat
            key={message.id}
            message={message}
          />
        ))}
        {isLoading && (
          <div className='flex justify-start ml-4'>
            <span className='animate-pulse inline-flex w-6 h-6 rounded-full bg-black opacity-75' />
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className='flex items-center'
      >
        <Input
          type='text'
          placeholder='Type your message...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          type='submit'
          className='ml-2'
        >
          Send
        </Button>
      </form>
    </>
  );
};

export default SurveyRoom;
