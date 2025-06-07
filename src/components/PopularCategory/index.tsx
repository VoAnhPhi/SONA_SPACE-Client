import { Link } from "react-router-dom";
const PopularCategory = () => {

  interface CategoryProps {
    id: string;
    name: string;
    image: string;
    slug: string;
  }

  const CategoryProduct: CategoryProps[] = [
    {
      id: "Ghế",
      name: "Ghế",
      image: "/images/productsCategory/ghe.jpg",
      slug: "ghe"
    },
    {
      id: "Bàn",
      name: "Bàn",
      image: "/images/productsCategory/ban.jpg",
      slug: "ban"
    },
    {
      id: "Tủ",
      name: "Tủ",
      image: "/images/productsCategory/tu.jpg",
      slug: "Tu"
    },
    {
      id: "Sofa",
      name: "Sofa",
      image: "/images/productsCategory/sofa.jpg",
      slug: "sofa"
    },
    {
      id: "Đèn",
      name: "Đèn",
      image: "/images/productsCategory/den.jpg",
      slug: "đèn"
    },
    {
      id: "Tranh",
      name: "Tranh",
      image: "/images/productsCategory/tranh.jpg",
      slug: "tranh"
    }

  ]

  const topCategories = CategoryProduct.slice(0, 2);
  // Phần còn lại
  const remainingCategories = CategoryProduct.slice(2);
  return (


    <>
      {/* Header/Navigation */}
      <section className="PopularCategory-full">
        <div className="container">
          <div className="category-of-products">

            <div className="category-of-products-s1">
              <div className="products-s1-frame-1">
                <div className="frame-1-text">
                  <a className="frame-1-text1">Các danh mục sản phẩm phổ biến nhất</a>
                  <a className="frame-1-text2">Khám phá những danh mục sản phẩm được ưa chuộng và lựa chọn nhiều nhất hiện nay</a>
                </div>

              </div>

              {topCategories.map((category) => (
                <div className="products-s1-frame-2" key={category.id}>
                  <img src={category.image} />
                  <div className="frame-2-t">
                    <h3>{category.name}</h3>
                    <a className="btn btn-primary" href={`danh-muc/${category.slug}`}>
                      Xem Sản Phẩm
                      <i className="icon">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.9128 4L9.8048 1M13.9128 4L9.8048 7M13.9128 4H1.12402"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </i>
                    </a>
                  </div>
                </div>
              ))}


            </div>
            <div className="category-of-products-s2">
              {remainingCategories.map((category) => (
                <div className="products-s2-frame-1" key={category.id}>
                  <img src={category.image} />
                  <div className="frame-2-t">
                    <h3>{category.name}</h3>
                    <a className="btn btn-cate" href={`danh-muc/${category.slug}`}>
                      Xem Sản Phẩm
                      <i className="icon">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.9128 4L9.8048 1M13.9128 4L9.8048 7M13.9128 4H1.12402"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </i>
                    </a>
                  </div>
                </div>
              ))}
              {/* <div className="products-s2-frame-1">
                    <p>Ghế</p>
                    <button>View all Product +</button>
                </div>
                <div className="products-s2-frame-2">
                    <p>Ghế</p>
                    <button>View all Product +</button>
                </div>
                <div className="products-s2-frame-3">
                    <p>Ghế</p>
                    <button>View all Product +</button>
                </div>
                <div className="products-s2-frame-4">
                    <p>Ghế</p>
                    <button>View all Product +</button>
                </div> */}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default PopularCategory;
