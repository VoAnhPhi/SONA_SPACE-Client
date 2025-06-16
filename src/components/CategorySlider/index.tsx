import { Link } from "react-router-dom";
import type { Category } from "../../types";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../services/categoryService";

export default function CategorySlider() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<string>('');
    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const data = await fetchAllCategories();
                setDebugInfo(prev => `${prev}\nReceived ${data.length} categories`);
                setCategories(data);
                setError(null);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                setError(`Failed to load rooms: ${errorMessage}`);
                setDebugInfo(prev => `${prev}\nError: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);
    const DebugInfo = () => {
        const isDev = true; // Always show debug info for now
        return isDev && debugInfo ? (
            <div className="category-list-debug">
                <details>
                    <summary>Debug Info</summary>
                    <pre>{debugInfo}</pre>
                </details>
            </div>
        ) : null;
    };
    if (loading) {
        return (
            <div className="category-list-loading">
                <div className="loading-spinner"></div>
                <p>Đang tải không gian...</p>
                <DebugInfo />
            </div>
        );
    }
    if (error) {
        return (
            <div className="category-list-error">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Thử lại</button>
                <DebugInfo />
            </div>
        );
    }
    if (categories.length === 0) {
        return (
            <div className="category-list-empty">
                <p>Không tìm thấy không gian nào</p>
                <DebugInfo />
            </div>
        );
    }
    return (
        <>
            <div className="categories-flex">
                {categories.map((category: Category) => (
                    <div
                        key={category.category_id}
                        className={`category-item`}
                    >
                        <Link to={`/danh-muc/${category.slug}`} className="category-link">
                            <div className="category-image">
                                <img src={category.category_image} alt={category.category_name} />
                            </div>
                            <h3 className="category-name">{category.category_name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}