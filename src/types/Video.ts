export interface Video {
  video_id: number
  title: string
  search_term: string
  redditId: string
  reddit_title: string
  reddit_content: string
  reddit_comments: string[]
  script: string
  thumbnail: string
  trailer_url: string
  video: string
  status_step: number
  status: string,
  youtube_url: string
  created_at: Date,
  updated_at: Date
}
