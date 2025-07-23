import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { productsAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
}

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: 'all',
    sizes: [] as string[],
    colors: [] as string[]
  });

  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryParam = searchParams.get('category');
        const params = categoryParam ? { category: categoryParam } : {};
        
        const response = await productsAPI.getAll(params);
        setProducts(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, toast]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      filtered = filtered.filter(product => product.category === categoryParam);
    } else if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // Price filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        if (filters.priceRange === 'under-30') return product.price < 30;
        if (filters.priceRange === '30-50') return product.price >= 30 && product.price <= 50;
        if (filters.priceRange === '50-70') return product.price >= 50 && product.price <= 70;
        if (filters.priceRange === 'over-70') return product.price > 70;
        return true;
      });
    }

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        filters.sizes.some(size => product.sizes.includes(size))
      );
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        filters.colors.some(color => product.colors.includes(color))
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy, searchParams]);

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: Array.isArray(prev[type]) && prev[type].includes(value) 
        ? (prev[type] as string[]).filter(item => item !== value)
        : [...(prev[type] as string[]), value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: 'all',
      sizes: [],
      colors: []
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span>Categories</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Men's Clothing Collection</h1>
        <p className="text-muted-foreground">
          Discover our minimalist essentials designed for comfort and style
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-card border rounded-lg p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {['t-shirts', 'hoodies', 'joggers', 'polo-shirts'].map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleFilter('categories', category)}
                    />
                    <Label htmlFor={category} className="capitalize">
                      {category.replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-2">
                {[
                  { value: 'under-30', label: 'Under $30' },
                  { value: '30-50', label: '$30 - $50' },
                  { value: '50-70', label: '$50 - $70' },
                  { value: 'over-70', label: 'Over $70' }
                ].map(range => (
                  <div key={range.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={range.value}
                      checked={filters.priceRange === range.value}
                      onCheckedChange={() => setFilters(prev => ({ 
                        ...prev, 
                        priceRange: prev.priceRange === range.value ? 'all' : range.value 
                      }))}
                    />
                    <Label htmlFor={range.value}>{range.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <div key={size} className="flex items-center space-x-1">
                    <Checkbox 
                      id={`size-${size}`}
                      checked={filters.sizes.includes(size)}
                      onCheckedChange={() => toggleFilter('sizes', size)}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm">{size}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Color</h4>
              <div className="space-y-2">
                {['Black', 'White', 'Grey', 'Navy', 'Olive'].map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`color-${color}`}
                      checked={filters.colors.includes(color)}
                      onCheckedChange={() => toggleFilter('colors', color)}
                    />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sort and Results */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Sort by: Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="aspect-square" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              filteredProducts.map(product => (
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
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">${product.price}</span>
                        <Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))
            )}
          </div>

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your filters.</p>
              <Button variant="outline" onClick={clearAllFilters} className="mt-4">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}