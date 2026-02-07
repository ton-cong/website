import { Link } from 'react-router-dom';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { StarIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product.id, 1);
    };

    return (
        <Link to={`/products/${product.id}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image
                    </div>
                )}
                {product.status === 'OUT_OF_STOCK' && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-slate-900 text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    <div className="flex items-center text-yellow-400 text-sm">
                        <StarIcon className="h-4 w-4 mr-1" />
                        <span>4.5</span>
                    </div>
                </div>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={product.status === 'OUT_OF_STOCK'}
                        className="!py-1.5 !px-3 text-sm"
                    >
                        Add
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
