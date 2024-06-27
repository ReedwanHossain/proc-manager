export interface Process {
  pid: string;
  createdAt: string;
  updatedAt: string;
  logs: string[];
  timerId: NodeJS.Timeout;
}

export interface ProcessReturn {
  pid: string;
  createdAt: string;
}
