import React, { useEffect, useState } from 'react';

interface Review {
    id: number; // hoặc string tùy dữ liệu thực tế
    avatarUrl: string;
    name: string;
    status: string;
    rating: number; // từ 1 đến 5
    date: string;
    commentTitle: string;
    commentContent: string;
    helpfulCount: number;
    isHelpful: boolean;
}
const Comment: React.FC = () => {
    const [data, setData] = useState<{ label: string; percentage: number }[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    useEffect(() => {
        // Giả lập API call
        const fetchData = async () => {
            const data = [
                { label: '5 sao', percentage: 80 },
                { label: '4 sao', percentage: 40 },
                { label: '3 sao', percentage: 20 },
                { label: '2 sao', percentage: 3 },
                { label: '1 sao', percentage: 2 },
            ];
            setData(data);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchReviews = async () => {
            const data: Review[] = [
                {
                    id: 1,
                    avatarUrl: "/images/detail/Photo by Justin Merced.png",
                    name: "Vladimir Putin",
                    status: "Đã mua hàng",
                    rating: 5,
                    date: "Ngày 30 tháng 4 năm 2025",
                    commentTitle: "Sản phẩm chất lượng, giao hàng nhanh, đóng gói cẩn thận",
                    commentContent: "Tôi rất hài lòng với sản phẩm đã mua, nó phù hợp với không gian trong căn phòng của tôi và đặc biệt chất lượng sản phẩm rất tốt.",
                    helpfulCount: 3,
                    isHelpful: false,
                },
                 {
                    id: 2,
                    avatarUrl: "/images/detail/Photo by Justin Merced.png",
                    name: "Vladimir Putin",
                    status: "Đã mua hàng",
                    rating: 5,
                    date: "Ngày 30 tháng 4 năm 2025",
                    commentTitle: "Sản phẩm chất lượng, giao hàng nhanh, đóng gói cẩn thận",
                    commentContent: "Tôi rất hài lòng với sản phẩm đã mua, nó phù hợp với không gian trong căn phòng của tôi và đặc biệt chất lượng sản phẩm rất tốt.",
                    helpfulCount: 3,
                    isHelpful: false,
                },
                 {
                    id: 3,
                    avatarUrl: "/images/detail/Photo by Justin Merced.png",
                    name: "Vladimir Putin",
                    status: "Đã mua hàng",
                    rating: 5,
                    date: "Ngày 30 tháng 4 năm 2025",
                    commentTitle: "Sản phẩm chất lượng, giao hàng nhanh, đóng gói cẩn thận",
                    commentContent: "Tôi rất hài lòng với sản phẩm đã mua, nó phù hợp với không gian trong căn phòng của tôi và đặc biệt chất lượng sản phẩm rất tốt.",
                    helpfulCount: 3,
                    isHelpful: false,
                },
                // Thêm các review khác nếu cần
            ];
            setReviews(data);
        };

        fetchReviews();
    }, []);
    return (
        <>
            <div className="box-comment">
                <div className="container">
                    <div className="box-recomment">
                        <div className="recomment-user">
                            <div className="user-name">Đánh giá của khách hàng</div>
                            <div className="user-star">
                                <div className="list-star">
                                    <img src="/images/detail/star.svg" alt="" />
                                    <img src="/images/detail/star.svg" alt="" />
                                    <img src="/images/detail/star.svg" alt="" />
                                    <img src="/images/detail/star.svg" alt="" />
                                    <img src="/images/detail/star.svg" alt="" />
                                </div>
                                <div className="list-number">
                                    <span>4.7</span>
                                </div>
                            </div>
                            <div className="user-description">800 lượt đánh giá của khách hàng đã mua sản phẩm</div>
                        </div>
                        <div className="recomment-star">
                            <div className="star-input">
                                {data.map((item, index) => (
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
            </div>
            <div className="filter-comment">
                <div className="container">
                    <div className="filter-section">
                        <div className="filter-value">
                            <div className="filter-value-title">Hiển thị 5 trên 100 đánh giá</div>
                        </div>

                        <div className="filter-sort-comment">
                            <div className="sort-togle" >
                                <img alt="Sort" src="/images/products/arrow-down-up.svg" />
                                <span>Sắp xếp</span>
                                <i className="dropdown-icon "></i>
                            </div>
                            {/* <div className="dropdown-menu">
                            <div className="dropdown-item ">Giá tăng dần</div>
                            <div className="dropdown-item ">Giá giảm dần</div>
                            <div className="dropdown-item ">Mới nhất</div>
                            <div className="dropdown-item ">Giảm giá nhiều</div>
                        </div> */}
                        </div>


                    </div>
                </div>
            </div>

            <div className="comment-content">
                <div className="container">
                    {reviews.map((reviews) => (
                        <div className="comment-content-value">

                            <div className="content-value-infomation">
                                <div className="info-img">
                                    <img src="/images/detail/Photo by Justin Merced.png" alt="" />
                                    <div className="info-name">
                                        <span className='name'>Vladimỉr Putin</span>
                                        <span className="status">Đã mua hàng</span>
                                    </div>
                                </div>

                                <div className="info-star">
                                    <div className="star-comment">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <img
                                                key={index}
                                                src={
                                                    index < reviews.rating
                                                        ? "/images/detail/star.svg"
                                                        : "/images/detail/star-filled.svg"
                                                }
                                                alt="star"
                                            />
                                        ))}
                                    </div>
                                    <span>{reviews.date}</span>
                                </div>
                            </div>
                            <div className="comment-value-evalute">
                                <span className='evalute-title'>{reviews.commentTitle}</span>
                                <span className='evalute-comment'>{reviews.commentContent}</span>
                            </div>
                            <div className="conment-value-attached">
                                <span>{reviews.helpfulCount} người dùng thấy điều này hữu ích</span>
                                <div
                                    className="attached"
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    onClick={() => reviews.id}
                                >
                                    <img src="/images/detail/like.svg" alt="" />
                                    <span>{reviews.isHelpful ? 'Bỏ thích' : 'Hữu ích'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Comment;
