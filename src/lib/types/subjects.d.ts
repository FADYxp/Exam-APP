export interface Subject {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SubjectsResponse {
  status: boolean;
  code: number;
  payload?: {
    data: Subject[];
    metadata: Metadata;
  };
  message?: string;
  errors?: {
    path: string;
    message: string;
    messages: string[];
  }[];
}