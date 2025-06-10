import { Link } from "react-router-dom";

interface CategoryProps {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export default function CategorySlider() {
  const categories: CategoryProps[] = [
    {
      id: "latest-edition",
      name: "Latest Edition",
      image: "/images/image1.jpg",
      slug: "latest-edition",
    },
    {
      id: "sofa",
      name: "Sofas",
      image: "/images/image2.jpg",
      slug: "sofa",
    },
    {
      id: "chair",
      name: "Ghế",
      image: "/images/image3.jpg",
      slug: "chair",
    },
    {
      id: "table",
      name: "Bàn",
      image: "/images/image4.jpg",
      slug: "table",
    },
    {
      id: "wardrobe",
      name: "Tủ",
      image: "/images/image5.jpg",
      slug: "wardrobe",
    },
    {
      id: "bed",
      name: "Giường",
      image: "/images/image6.jpg",
      slug: "bed",
    },
    {
      id: "garden-table",
      name: "Bàn Ghế Sân Vường",
      image: "/images/image7.jpg",
      slug: "garden-table",
    },
    {
      id: "carpet",
      name: "Thảm",
      image: "/images/image8.jpg",
      slug: "carpet",
    },
    {
      id: "accessory",
      name: "Phụ Kiện",
      image: "/images/image9.jpg",
      slug: "accessory",
    },
    {
      id: "light",
      name: "Đèn",
      image: "/images/image10.jpg",
      slug: "light",
    },
  ];
  return (
    <>
      <div className="categories-flex">
        {categories.map((category) => (
          <div key={category.id} className={`category-item`}>
            <Link to={`/san-pham/${category.slug}`} className="category-link">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <h3 className="category-name">{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
