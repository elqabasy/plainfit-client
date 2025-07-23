import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Home, ShoppingBag } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Error message */}
          <div>
            <div className="text-6xl font-bold text-secondary mb-4">404</div>
            <div className="w-16 h-1 bg-primary mb-6"></div>
            
            <h1 className="text-3xl font-bold mb-4">
              Looks like this style didn't make the cut.
            </h1>
            
            <p className="text-muted-foreground mb-8 max-w-md">
              The page you're looking for seems to have gone out of stock. 
              But don't worry – we have plenty of other great styles waiting for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shop Now
                </Button>
              </Link>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Or try these popular categories:
              </p>
              <div className="flex flex-wrap gap-2">
                <Link to="/categories?category=t-shirts">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    T-shirts
                  </Button>
                </Link>
                <Link to="/categories?category=hoodies">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    Hoodies
                  </Button>
                </Link>
                <Link to="/categories?category=joggers">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    Joggers
                  </Button>
                </Link>
                <Link to="/categories?category=new-arrivals">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    New Arrivals
                  </Button>
                </Link>
              </div>
            </div>

            {/* Search */}
            <div className="mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Right side - Male model image */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Search className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Image placeholder</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-lg">?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}