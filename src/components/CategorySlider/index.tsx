//RoomSlider
import { Link } from "react-router-dom";

interface RoomCategoryProps {
    id: string;
    name: string;
    image: string;
    slug: string;
}

export default function CategorySlider() {
    const roomCategories: RoomCategoryProps[] = [
        {
            id: "living-room",
            name: "Phòng Khách",
            image: "/images/rooms/image1.jpg",
            slug: "phong-khach"
        },
        {
            id: "dining-room",
            name: "Phòng Ăn",
            image: "/images/rooms/image2.jpg",
            slug: "phong-an"
        },
        {
            id: "bedroom",
            name: "Phòng Ngủ",
            image: "/images/rooms/image3.jpg",
            slug: "phong-ngu"
        },
        {
            id: "workspace",
            name: "Không gian làm việc",
            image: "/images/rooms/image4.jpg",
            slug: "khong-gian-lam-viec"
        },
        {
            id: "small-space",
            name: "Small Space",
            image: "/images/rooms/image5.jpg",
            slug: "small-space"
        },
        {
            id: "outdoor-space",
            name: "Không gian ngoài trời",
            image: "/images/rooms/image6.jpg",
            slug: "khong-gian-ngoai-troi"
        }
    ];
    return (
        <>
            <div className="categories-flex">
                {roomCategories.map((room) => (
                    <div
                        key={room.id}
                        className={`category-item`}
                    >
                        <Link to={`/khong-gian/${room.slug}`} className="category-link">
                            <div className="category-image">
                                <img src={room.image} alt={room.name} />
                            </div>
                            <h3 className="category-name">{room.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}