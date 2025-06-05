const PopularCategory = () => {

    interface CategoryProps{
         id: string;
        name: string;
        image: string;
        slug: string;
}
    
    const CategoryProduct:CategoryProps [] = [
        {
            id: "Ghế",
            name: "Ghế",
            image: "/images/productsCategory/ghe.jpg",
            slug: "ghế"
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
                    <p className="frame-1-text1">Các danh mục sản phẩm phổ biến nhất</p>
                    <p className="frame-1-text2">Khám phá những danh mục sản phẩm được ưa chuộng và lựa chọn nhiều nhất hiện nay</p>
                </div>

                {topCategories.map((category) => (
                    <div className="products-s1-frame-2" key={category.id}>
                    <img src={category.image}/>
                    <div className="frame-2-t">
                            <p>{category.name}</p>
                    <button>View all Product +</button>
                    </div>
                </div>
                ))}


            </div>
            <div className="category-of-products-s2">
                {remainingCategories.map((category) => (
                    <div className="products-s2-frame-1" key={category.id}>
                    <img src={category.image}/>
                    <div className="frame-2-t">
                            <p>{category.name}</p>
                    <button>View all Product +</button>
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
