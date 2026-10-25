export type ChibiState = 
  | 'idle'
  | 'greeting'
  | 'happy'
  | 'thinking'
  | 'coding'
  | 'engineering'
  | 'explaining'
  | 'sleeping'
  | 'celebrating';

export interface CompanionMessage {
  id: string;
  text: string;
  actionText?: string;
  actionHref?: string;
  state: ChibiState;
}
