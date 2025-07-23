import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">PlainFit Portal</h3>
            <p className="text-sm text-secondary-foreground/80">
              Style made simple for the modern man.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/categories" className="block text-sm hover:text-primary transition-colors">
                Categories
              </Link>
              <Link to="/order-history" className="block text-sm hover:text-primary transition-colors">
                Order History
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2">
              <Link to="/size-guide" className="block text-sm hover:text-primary transition-colors">
                Size Guide
              </Link>
              <Link to="/returns" className="block text-sm hover:text-primary transition-colors">
                Returns
              </Link>
              <Link to="/shipping" className="block text-sm hover:text-primary transition-colors">
                Shipping
              </Link>
              <Link to="/contact" className="block text-sm hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-secondary-foreground/80">
              Get updates on new arrivals and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Your email" 
                className="bg-card text-card-foreground"
              />
              <Button size="sm" className="bg-primary hover:bg-primary-hover">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/60">
            © 2024 PlainFit Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}