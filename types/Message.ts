export interface Message {
  id: number;
  chat: string;
  created_at: Date;
  sender: number;
  roomId?: string;
  groupId?: string;
  role?: string;
}
