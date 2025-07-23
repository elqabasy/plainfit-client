import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import essentialTeeImage from '@/assets/products/essential-cotton-tee-white.jpg';
import comfortHoodieImage from '@/assets/products/comfort-hoodie-black.jpg';
import everydayJoggersImage from '@/assets/products/everyday-joggers-gray.jpg';
import classicPoloImage from '@/assets/products/classic-polo-navy.jpg';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  colors: Array<{ name: string; value: string }>;
  sizes: string[];
  features: string[];
  rating: number;
  reviewCount: number;
}

export function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();

  // Mock product data - in real app, fetch from API
  const [product] = useState<Product>({
    id: '1',
    name: 'Essential Cotton Tee',
    price: 29.99,
    originalPrice: 39.99,
    image: essentialTeeImage,
    description: 'Premium quality cotton t-shirt designed for everyday comfort and style',
    category: 'T-Shirts',
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' },
      { name: 'Olive', value: '#8FBC8F' },
      { name: 'Navy', value: '#1E3A8A' },
      { name: 'Burgundy', value: '#7F1D1D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      '100% premium cotton construction',
      'Pre-shrunk for lasting fit',
      'Reinforced seams for durability',
      'Classic fit with comfortable drape',
      'Available in multiple colors'
    ],
    rating: 4.8,
    reviewCount: 124
  });

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = [
    {
      id: '2',
      name: 'Comfort Hoodie',
      price: 59.99,
      image: comfortHoodieImage,
      color: 'Black'
    },
    {
      id: '3',
      name: 'Everyday Joggers',
      price: 49.99,
      image: everydayJoggersImage,
      color: 'Grey'
    },
    {
      id: '4',
      name: 'Classic Polo',
      price: 39.99,
      image: classicPoloImage,
      color: 'Navy'
    }
  ];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor.name,
      quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const adjustQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to="/categories?category=t-shirts" className="text-muted-foreground hover:text-foreground">T-Shirts</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[product.image, essentialTeeImage, comfortHoodieImage, classicPoloImage].map((img, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg border-2 border-transparent hover:border-primary cursor-pointer">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <Badge variant="destructive">25% OFF</Badge>
                </>
              )}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor.name === color.name ? 'border-primary' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Size</h3>
              <Link to="/size-guide" className="text-sm text-primary hover:underline">
                Size Guide
              </Link>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={`h-12 ${selectedSize === size ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => adjustQuantity(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => adjustQuantity(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </Button>
          </div>

          {/* Product Benefits */}
          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-sm">30-day return policy</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">2-year warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (124)</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">
                  Our Essential Cotton Tee is crafted from 100% premium cotton for ultimate comfort and durability. 
                  This versatile piece features a classic fit that's perfect for layering or wearing on its own.
                </p>
                <h4 className="font-medium mb-3">Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="care" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Washing Instructions:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Machine wash cold with like colors</li>
                      <li>• Use non-chlorine bleach when needed</li>
                      <li>• Tumble dry low heat</li>
                      <li>• Iron on low heat if needed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Storage:</h4>
                    <p className="text-sm text-muted-foreground">
                      Store in a cool, dry place. Fold neatly to prevent wrinkles.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold">{product.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.reviewCount} reviews</p>
                    </div>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  <div className="space-y-4">
                    {/* Sample reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">John S.</span>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <p className="text-sm">Perfect fit and great quality. Exactly what I was looking for!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/products/${relatedProduct.id}`}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{relatedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{relatedProduct.color}</p>
                  <span className="font-semibold">${relatedProduct.price}</span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}