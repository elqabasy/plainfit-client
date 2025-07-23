import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/categories">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = total;
  const shipping = 0; // Free shipping
  const tax = total * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">Review your items before checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                      </div>
                      
                      <div className="flex flex-col sm:items-end">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-lg">${item.price}</span>
                          <span className="text-sm text-muted-foreground">
                            ${item.price} each
                          </span>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 mb-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Continue Shopping */}
          <div className="pt-4">
            <Link to="/categories">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-success font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <Input placeholder="Promo code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Payment Methods */}
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">We accept</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs">VISA</div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs">MC</div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs">AMEX</div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs">DISC</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">🔒 Secure checkout</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mock recently viewed products */}
          {[
            { id: '1', name: 'Classic Polo', price: 39.99, image: '/api/placeholder/300/300', color: 'Navy' },
            { id: '2', name: 'Casual Shirt', price: 45.99, image: '/api/placeholder/300/300', color: 'Burgundy' },
            { id: '3', name: 'Basic Tee', price: 24.99, image: '/api/placeholder/300/300', color: 'Olive' },
            { id: '4', name: 'Grey Hoodie', price: 59.99, image: '/api/placeholder/300/300', color: 'Grey' }
          ].map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/products/${product.id}`}>
                <div className="aspect-square bg-muted"></div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.color}</p>
                  <span className="font-semibold">${product.price}</span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}