import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { productsAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-banner.jpg';
import essentialTeeImage from '@/assets/products/essential-cotton-tee-white.jpg';
import comfortHoodieImage from '@/assets/products/comfort-hoodie-black.jpg';
import everydayJoggersImage from '@/assets/products/everyday-joggers-gray.jpg';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const featuredCategories = [
    {
      name: 'T-shirts',
      description: 'Essential basics for everyday wear.',
      image: essentialTeeImage,
      link: '/categories?category=t-shirt'
    },
    {
      name: 'Hoodies',
      description: 'Comfortable layers for any season.',
      image: comfortHoodieImage,
      link: '/categories?category=hoodie'
    },
    {
      name: 'Joggers',
      description: 'Versatile pants for work and leisure.',
      image: everydayJoggersImage,
      link: '/categories?category=jogger'
    }
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getAll({ featured: true });
        setFeaturedProducts(response.data.slice(0, 4)); // Show only 4 products
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load featured products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [toast]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-muted">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            Style Made Simple.
          </h1>
          <p className="text-xl mb-8 text-white/90">
            For the modern man.
          </p>
          <Link to="/categories">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <Card key={category.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Link to={category.link}>
                    <Button variant="outline" className="w-full">
                      Shop Collection →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link to="/categories">
              <Button variant="outline">View All →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="aspect-square" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredProducts.map((product) => (
                <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/products/${product._id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 capitalize">{product.category}</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">${product.price}</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Wardrobe?</h2>
          <p className="text-lg mb-8 text-secondary-foreground/80">
            Join thousands of men who have discovered the comfort and clarity of PlainFit clothing.
            Upgrade your style today.
          </p>
          <Link to="/categories">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
              Shop the Collection
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}