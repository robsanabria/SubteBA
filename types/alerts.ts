export interface Alert {
  id: string;
  header: string;
  description: string;
  timestamp: string;
}

export interface LineAlert {
  id: string;
  alert: {
    header_text: {
      translation: Array<{ text: string }>;
    };
    description_text: {
      translation: Array<{ text: string }>;
    };
    informed_entity?: Array<{
      route_id: string;
    }>;
    status?: string;
  };
}

export interface LineState {
  status: string;
  description: string;
  alerts: string[];
}

export interface SubwayLine {
  id: string;
  name: string;
  color: string;
} 