export interface VideoRecord {
  postId: string;
  title: string;
  summary: string;
  facebookLink: string;
  twitterLink: string;
}

export interface ShareLinks {
  facebook?: string;
  twitter?: string;
  email?: string;
  native?: string;
}

export interface RawVideoItem {
  post_noid?: string;
  title?: string;
  summary?: string;
  share_links?: ShareLinks;
  [key: string]: unknown;
}

export interface NBCResponse {
  homepage_top_videos?: RawVideoItem[];
  [key: string]: unknown;
}
