// src/services/comment.service.ts
import { getCommentsByProductId } from "../api/comment";

import type { Comment, RatingStats, CommentResponse } from "../types";

export const fetchCommentsByProductId = async (
  productId: number,
  page = 1
): Promise<CommentResponse> => {
  const raw = await getCommentsByProductId(productId, page);

  return {
    productId: raw.product_id,
    stats: {
      average: parseFloat(raw.stats.average_rating),
      total: raw.stats.total_ratings,
      breakdown: {
        fiveStar: parseInt(raw.stats.rating_breakdown.five_star),
        fourStar: parseInt(raw.stats.rating_breakdown.four_star),
        threeStar: parseInt(raw.stats.rating_breakdown.three_star),
        twoStar: parseInt(raw.stats.rating_breakdown.two_star),
        oneStar: parseInt(raw.stats.rating_breakdown.one_star),
      },
    },
    comments: raw.comments.map((c: any) => ({
      id: c.comment_id,
      userId: c.user_id,
      userName: c.user_name,
      userImage: c.user_image,
      description: c.comment_description,
      rating: c.comment_rating,
      createdAt: c.created_at,
    })),
    pagination: raw.pagination,
  };
};
