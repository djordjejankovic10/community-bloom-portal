export type SearchResultType = 
  | "group" 
  | "channel" 
  | "post" 
  | "member" 
  | "challenge" 
  | "event"
  | "circle"
  | "recording"
  | "meetup";

export interface BaseSearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  image?: string;
  linkTo: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface GroupSearchResult extends BaseSearchResult {
  type: "group";
  memberCount: number;
}

export interface ChannelSearchResult extends BaseSearchResult {
  type: "channel";
  group: {
    id: string;
    name: string;
  };
}

export interface PostSearchResult extends BaseSearchResult {
  type: "post";
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
}

export interface MemberSearchResult extends BaseSearchResult {
  type: "member";
  avatar?: string;
  handle: string;
  followers?: number;
}

export interface ChallengeSearchResult extends BaseSearchResult {
  type: "challenge";
  participants: number;
  startDate: string;
  endDate: string;
}

export interface EventSearchResult extends BaseSearchResult {
  type: "event";
  date: string;
  time: string;
  attendees: number;
}

export interface CircleSearchResult extends BaseSearchResult {
  type: "circle";
  memberCount: number;
}

export interface RecordingSearchResult extends BaseSearchResult {
  type: "recording";
  duration: string;
  date: string;
}

export interface MeetupSearchResult extends BaseSearchResult {
  type: "meetup";
  date: string;
  location: string;
  attendees: number;
}

export type SearchResult = 
  | GroupSearchResult 
  | ChannelSearchResult 
  | PostSearchResult 
  | MemberSearchResult 
  | ChallengeSearchResult 
  | EventSearchResult
  | CircleSearchResult
  | RecordingSearchResult
  | MeetupSearchResult;
