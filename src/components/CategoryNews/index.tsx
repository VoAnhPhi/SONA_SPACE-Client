import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface NewsCategoriesProps {
  categories: Category[];
  getPostCountByCategory: (categoryName: string) => number;
}

const NewsCategories: React.FC<NewsCategoriesProps> = ({
  categories,
  getPostCountByCategory,
}) => {
  return (
    <div className="news-categories">
      <h2>Danh mục tin tức</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/tin-tuc/${category.slug}`} className="category-item">
              <span className="category-name">{category.name}</span>
              <span className="post-count">
                {getPostCountByCategory(category.name)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsCategories;
