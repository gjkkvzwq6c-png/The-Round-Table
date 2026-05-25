export interface Figure {
  id: string;
  name: string;
  descriptor: string;
  era?: string;
}

export interface Seat {
  index: number;
  figure: Figure | null;
}

export interface FigureResponse {
  figure: Figure;
  text: string;
  isLoading: boolean;
  error?: string;
}

export interface Exchange {
  id: string;
  question: string;
  responses: FigureResponse[];
  timestamp: number;
}

export interface ConverseRequest {
  question: string;
  figures: Figure[];
}

export interface ConverseResponse {
  responses: Array<{
    figureId: string;
    text: string;
    error?: string;
  }>;
}
