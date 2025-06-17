import React from "react";
import type { CommentResponse } from "../../types";

interface CommentProps {
  commentData: CommentResponse | null;
}

const Comment: React.FC<CommentProps> = ({ commentData }) => {
  if (!commentData) return <div>Loading comments...</div>;

  // Calculate percentages for rating breakdown
  const total = commentData.stats.total_ratings;
  const ratingData = [
    {
      label: "5 sao",
      percentage:
        (Number(commentData.stats.rating_breakdown.five_star) / total) * 100,
    },
    {
      label: "4 sao",
      percentage:
        (Number(commentData.stats.rating_breakdown.four_star) / total) * 100,
    },
    {
      label: "3 sao",
      percentage:
        (Number(commentData.stats.rating_breakdown.three_star) / total) * 100,
    },
    {
      label: "2 sao",
      percentage:
        (Number(commentData.stats.rating_breakdown.two_star) / total) * 100,
    },
    {
      label: "1 sao",
      percentage:
        (Number(commentData.stats.rating_breakdown.one_star) / total) * 100,
    },
  ];

  return (
    <>
      <div className="box-comment">
          <div className="box-recomment">
            <div className="recomment-user">
              <div className="user-name">Đánh giá của khách hàng</div>
              <div className="user-star">
                <div className="list-star">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src="/images/detail/star.svg" alt="" />
                  ))}
                </div>
                <div className="list-number">
                  <span>{commentData.stats.average_rating}</span>
                </div>
              </div>
              <div className="user-description">
                {commentData.stats.total_ratings} lượt đánh giá của khách hàng
                đã mua sản phẩm
              </div>
            </div>
            <div className="recomment-star">
              <div className="star-input">
                {ratingData.map((item, index) => (
                  <div key={index} className="star-evalue">
                    <span>{item.label}</span>
                    <div className="star-frame">
                      <div
                        className="frame-value"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>

      <div className="filter-comment">
          <div className="filter-section">
            <div className="filter-value">
              <div className="filter-value-title">
                Hiển thị {commentData.comments.length} trên{" "}
                {commentData.pagination.totalComments} đánh giá
              </div>
            </div>
            <div className="filter-sort-comment">
              <div className="sort-togle">
                <img alt="Sort" src="/images/products/arrow-down-up.svg" />
                <span>Sắp xếp</span>
                <i className="dropdown-icon "></i>
              </div>
            </div>
          </div>
      </div>

      <div className="comment-content">
          {commentData.comments.map((comment) => (
            <div key={comment.comment_id} className="comment-content-value">
              <div className="content-value-infomation">
                <div className="info-img">
                  <img src={comment.user_image} alt="" />
                  <div className="info-name">
                    <span className="name">{comment.user_name}</span>
                    <span className="status">Đã mua hàng</span>
                  </div>
                </div>
                <div className="info-star">
                  <div className="star-comment">
                    {[...Array(5)].map((_, index) => (
                      <img
                        key={index}
                        src={
                          index < comment.comment_rating
                            ? "/images/detail/star.svg"
                            : "/images/detail/star-filled.svg"
                        }
                        alt="star"
                      />
                    ))}
                  </div>
                  <span>
                    {new Date(comment.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>

              <div className="comment-value-evalute">
                <span className="evalute-title">{comment.comment_title}</span>
                <span className="evalute-comment">
                  {comment.comment_description}
                </span>
              </div>
              <div className="conment-value-attached">
                <span>
                  {comment.comment_reaction} người dùng thấy điều này hữu ích
                </span>
                <div
                  className="attached"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onClick={() => comment.id}
                >
                  <img src="/images/detail/like.svg" alt="" />
                  <span>
                    {comment.comment_reaction ? "Bỏ thích" : "Hữu ích"}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Comment;
