export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  badge: string;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// For compatibility with fallback data
export interface FallbackProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  category: string;
  badge: string;
  description?: string;
}

// Function to convert fallback product to Product interface
export function convertToProduct(fallback: FallbackProduct): Product {
  return {
    _id: fallback.id.toString(),
    name: fallback.name,
    price: fallback.price,
    originalPrice: fallback.originalPrice,
    description: fallback.description || '',
    category: fallback.category,
    image: fallback.image,
    rating: fallback.rating,
    badge: fallback.badge,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
