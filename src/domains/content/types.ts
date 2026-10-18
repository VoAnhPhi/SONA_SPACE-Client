// News/Blog related interfaces
export interface NewsArticle {
  news_id: number;
  news_name: string;
  news_title: string;
  news_slug: string;
  news_image: string;
  news_summary: string;
  news_view: number;
  news_content: string;
  news_publishDate: string;
  news_author?: string;
  news_tags?: string[];
  created_at?: String | undefined;
  news_category_id: string;
}

export interface NewsCategory {
  news_category_id: number;
  title: string;
  news_category_slug: string;
  news_category_status: string;
  news_count: number;
  name: string;
  news_slug: string;
}

export interface CommentStats {
  average_rating: string;
  total_ratings: number;
  rating_breakdown: {
    five_star: string;
    four_star: string;
    three_star: string;
    two_star: string;
    one_star: string;
  };
}

export interface Comment {
  comment_id: number;
  comment_title: string;
  user_id: number;
  user_name: string;
  user_image: string;
  comment_description: string;
  comment_rating: number;
  created_at: string;
}

export interface CommentResponse {
  product_id: number;
  stats: CommentStats;
  comments: Comment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalComments: number;
    commentsPerPage: number;
  };
}
