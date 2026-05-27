import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingBag, ArrowLeft, Truck, RotateCcw, Shield } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button, Badge } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { getRelatedProducts, calculateDiscount, formatPrice } from '@/utils';
import { useCartStore } from '@/store/cartStore';
import { pageTransition, fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { SITE_CONFIG } from '@/constants';

type TabKey = 'description' | 'materials' | 'shipping';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'description', label: 'Description' },
  { key: 'materials', label: 'Materials & Care' },
  { key: 'shipping', label: 'Shipping' },
];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem, getItemCount } = useCartStore();
  const { addToast } = useToast();
  const cartItemCount = getItemCount();

  const product = products.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]?.name,
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>('description');

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(products, product, 4);
  }, [product]);

  // Product not found state
  if (!product) {
    return (
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-h-screen flex-col bg-background"
      >
        <Header cartItemCount={cartItemCount} />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
          <h1 className="mb-4 font-serif text-3xl font-semibold text-text">
            Product not found
          </h1>
          <p className="mb-8 max-w-md text-secondary">
            The product you are looking for does not exist or may have been
            removed.
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <ArrowLeft size={16} />
            Back to Catalog
          </Link>
        </main>
        <Footer />
        <CookieBanner />
      </motion.div>
    );
  }

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const category = categories.find((c) => c.slug === product.category);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Catalog', path: '/catalog' },
    ...(category
      ? [{ label: category.name, path: `/catalog/${category.slug}` }]
      : []),
    { label: product.name },
  ];

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    addToast('Added to cart', 'success');
  };

  const handleQuickAdd = (p: (typeof products)[number]) => {
    addItem(p);
    addToast('Added to cart', 'success');
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex min-h-screen flex-col bg-background"
    >
      <Header cartItemCount={cartItemCount} />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Product detail */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
          >
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="mb-3 flex flex-wrap gap-2">
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.isBestseller && (
                  <Badge variant="bestseller">Bestseller</Badge>
                )}
                {discount > 0 && (
                  <Badge variant="sale">-{discount}%</Badge>
                )}
              </div>

              {/* Name */}
              <h1 className="mb-3 font-serif text-2xl font-semibold text-text lg:text-3xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(product.rating)
                          ? 'fill-accent text-accent'
                          : 'text-border'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-secondary">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-accent">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-secondary line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Short description */}
              <p className="mb-6 text-sm leading-relaxed text-secondary">
                {product.shortDescription}
              </p>

              {/* Color selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <p className="mb-2 text-sm font-medium text-text">
                    Color:{' '}
                    <span className="font-normal text-secondary">
                      {selectedColor}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                        className={`h-9 w-9 rounded-full border-2 transition-all cursor-pointer ${
                          selectedColor === color.name
                            ? 'ring-2 ring-accent ring-offset-2 border-accent'
                            : 'border-border hover:border-secondary'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Select color ${color.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <p className="mb-2 text-sm font-medium text-text">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                          selectedSize === size
                            ? 'border-accent bg-accent text-white'
                            : 'border-border bg-white text-text hover:border-secondary'
                        }`}
                        aria-label={`Select size ${size}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium text-text">Quantity</p>
                <div className="inline-flex items-center rounded-lg border border-border">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center text-text transition-colors hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm font-medium text-text">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="flex h-10 w-10 items-center justify-center text-text transition-colors hover:bg-surface cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to cart / Out of stock */}
              {product.inStock ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  disabled
                  className="w-full"
                >
                  Out of Stock
                </Button>
              )}

              {/* Shipping highlights */}
              <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-3">
                <div className="flex items-center gap-2.5">
                  <Truck size={18} className="shrink-0 text-accent" />
                  <span className="text-xs text-secondary">
                    Free shipping over {SITE_CONFIG.CURRENCY_SYMBOL}
                    {SITE_CONFIG.FREE_SHIPPING_THRESHOLD}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw size={18} className="shrink-0 text-accent" />
                  <span className="text-xs text-secondary">
                    {SITE_CONFIG.RETURN_DAYS}-day returns
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Shield size={18} className="shrink-0 text-accent" />
                  <span className="text-xs text-secondary">
                    Secure checkout
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs section */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-16"
          >
            {/* Tab headers */}
            <div className="flex gap-8 border-b border-border">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative pb-3 text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? 'text-accent'
                      : 'text-secondary hover:text-text'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-secondary">
                    {product.description}
                  </p>
                  {product.dimensions && (
                    <p className="mt-4 text-sm text-secondary">
                      <span className="font-medium text-text">Dimensions: </span>
                      {product.dimensions}
                    </p>
                  )}
                  {product.weight && (
                    <p className="mt-2 text-sm text-secondary">
                      <span className="font-medium text-text">Weight: </span>
                      {product.weight}
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-text">
                      Materials
                    </h3>
                    <p className="text-sm leading-relaxed text-secondary">
                      {product.materials}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-text">
                      Care Instructions
                    </h3>
                    <p className="text-sm leading-relaxed text-secondary">
                      {product.care}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4 text-sm leading-relaxed text-secondary">
                  <p>
                    Standard delivery takes 3-5 business days within Europe.
                    Express shipping (1-2 business days) is available at
                    checkout for an additional fee.
                  </p>
                  <p>
                    Orders over {SITE_CONFIG.CURRENCY_SYMBOL}
                    {SITE_CONFIG.FREE_SHIPPING_THRESHOLD} qualify for free
                    standard shipping. Orders below this threshold incur a
                    flat rate of {formatPrice(SITE_CONFIG.SHIPPING_COST)}.
                  </p>
                  <p>
                    We offer a {SITE_CONFIG.RETURN_DAYS}-day return policy on
                    all items in original condition. Return shipping is free
                    for exchanges; refunds are processed within 5-7 business
                    days of receiving the returned item.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <motion.section
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
              className="mt-8 mb-12"
            >
              <h2 className="mb-8 font-serif text-2xl font-semibold text-text">
                You May Also Like
              </h2>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              >
                {relatedProducts.map((related) => (
                  <motion.div key={related.id} variants={staggerItem}>
                    <ProductCard
                      product={related}
                      onAddToCart={handleQuickAdd}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
