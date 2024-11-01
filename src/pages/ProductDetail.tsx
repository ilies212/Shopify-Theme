import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../store/cartStore';
import { products } from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCart((state) => state.addItem);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <p className="text-xl text-center">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen"
    >
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-3xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-8">{product.description}</p>
            <div className="space-y-4">
              <p className="text-gray-600">
                Stock: <span className="font-semibold">{product.stock}</span>
              </p>
              <p className="text-gray-600">
                Category: <span className="font-semibold">{product.category}</span>
              </p>
              <button
                onClick={() => addItem(product)}
                className="btn-primary w-full flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;