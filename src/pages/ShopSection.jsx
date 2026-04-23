'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ShopHeader from '../modules/header/ShopHeader'; 
import Footer from '../modules/footer/Footer';

const ShopSection = () => {
  const [currentView, setCurrentView] = useState('shop'); 
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 15000]); 
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(12);

  const [modalSize, setModalSize] = useState("M");
  const [modalColor, setModalColor] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMobileFilterOpen || selectedProduct || isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isMobileFilterOpen, selectedProduct, isCheckoutOpen]);

  useEffect(() => {
    setVisibleItems(12);
  }, [activeCategory, priceRange, selectedBrand, selectedSize, sortBy, searchQuery]);

  const categoriesData = [
    { name: "Men's Wear", icon: "👕", img: "/media/mens-wear.jpg" },
    { name: "Women's Wear", icon: "👚", img: "https://images.unsplash.com/photo-1506629082923-512332f97f19?w=500&q=80" },
    { name: "Hoodies", icon: "🧥", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" },
    { name: "Accessories", icon: "👜", img: "https://images.unsplash.com/photo-1598289431512-b97b0917abbc?w=500&q=80" },
    { name: "Supplements", icon: "💊", img: "https://images.unsplash.com/photo-1593092438091-455551c48b18?w=500&q=80" },
    { name: "Sale Items", icon: "🏷️", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&q=80", isSale: true }
  ];

  const brands = ["All", "GymArmour", "IronGear", "Jacked", "Spartan", "Local"];
  const sizes = ["All", "S", "M", "L", "XL"];
  const modalSizes = ["S", "M", "L", "XL"];

  const pakistaniProductNames = {
    "Men's Wear": ["Dri-Fit Gym T-Shirt Men", "Summer Tracksuit Half", "Compression Inner Shirt", "Gym Shorts Zipper", "Sleeveless Stringer"],
    "Women's Wear": ["High Waist Leggings", "Shockproof Sports Bra", "Yoga Pants Premium", "Women Gym Set", "Activewear Top"],
    "Hoodies": ["Oversized Gym Hoodie", "Fleece Sweatshirt", "Zipper Gym Jacket", "Sleeveless Hoodie"],
    "Accessories": ["Weightlifting Gloves", "Wrist Wraps Support", "Gym Belt Powerlifting", "Shaker Bottle 700ml"],
    "Supplements": ["Whey Protein 5lbs", "Creatine Monohydrate", "Pre-Workout Energy", "BCAA Amino Acids"]
  };

  const products = useMemo(() => {
    const allProducts = [];
    const colors = ["Black", "White", "Navy"];
    categoriesData.slice(0, 5).forEach((cat, catIndex) => {
      const namesList = pakistaniProductNames[cat.name];
      for (let i = 1; i <= 24; i++) {
        const brand = brands[Math.floor(Math.random() * (brands.length - 1)) + 1];
        const randomName = namesList[Math.floor(Math.random() * namesList.length)];
        const price = Math.floor(Math.random() * (6000 - 1500) + 1500); 
        const hasDiscount = Math.random() > 0.7;
        const discountPercent = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;
        const oldPrice = hasDiscount ? Math.floor(price / (1 - discountPercent/100)) : null;
        
        allProducts.push({
          id: `${catIndex}-${i}`,
          category: cat.name,
          name: `${brand} ${randomName}`,
          brand: brand,
          price: price,
          oldPrice: oldPrice,
          discount: discountPercent,
          rating: (Math.random() * (5 - 4) + 4).toFixed(1),
          reviews: Math.floor(Math.random() * 500) + 10,
          image: cat.img,
          color: colors[Math.floor(Math.random() * colors.length)],
          inStock: Math.random() > 0.1,
          featured: Math.random() > 0.8,
          new: Math.random() > 0.85
        });
      }
    });
    return allProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      if (p.price > priceRange[1]) return false;
      if (activeCategory !== "All" && activeCategory !== "Sale Items" && p.category !== activeCategory) return false;
      if (activeCategory === "Sale Items" && p.oldPrice === null) return false;
      if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;
      return true;
    });

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch(sortBy) {
      case "price-low": filtered.sort((a, b) => a.price - b.price); break;
      case "price-high": filtered.sort((a, b) => b.price - a.price); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      case "newest": filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); break;
      default: filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return filtered;
  }, [products, activeCategory, priceRange, selectedBrand, selectedSize, sortBy, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleItems);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      const el = document.getElementById('shop-grid');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
    }
  };

  const openProductModal = (product, e) => {
    if (e) e.stopPropagation();
    setSelectedProduct(product);
    setModalSize("M");
    setModalColor(product.color);
  };

  const confirmAddToCart = () => {
    if (!selectedProduct.inStock) { showToast("Out of stock!", "error"); return; }
    const cartItemId = `${selectedProduct.id}-${modalSize}-${modalColor}`;
    const existing = cart.find(item => item.cartId === cartItemId);
    
    if (existing) {
      setCart(cart.map(item => item.cartId === cartItemId ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...selectedProduct, cartId: cartItemId, selectedSize: modalSize, selectedColor: modalColor, qty: 1 }]);
    }
    showToast(`Added to cart!`, "success");
    setSelectedProduct(null);
  };

  const updateQty = (cartId, amount) => {
    setCart(cart.map(item => item.cartId === cartId ? { ...item, qty: Math.max(1, item.qty + amount) } : item));
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCart([]); setIsCheckoutOpen(false); setCurrentView('shop');
    showToast(`Order Placed Successfully!`, "success");
  };

  const resetFilters = () => {
    setActiveCategory("All"); setPriceRange([0, 15000]); setSelectedSize("All"); setSelectedBrand("All"); setSearchQuery("");
    setIsMobileFilterOpen(false);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]"><div className="w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 flex flex-col relative">
      
      <ShopHeader />

      {currentView === 'shop' && (
        <button 
          onClick={() => { setCurrentView('cart'); window.scrollTo(0,0); }}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 bg-red-600 text-white p-4 lg:p-5 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-pointer group"
        >
          <svg className="w-6 h-6 lg:w-7 lg:h-7 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-black w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center rounded-full border-2 border-white">
              {cartItemsCount}
            </span>
          )}
        </button>
      )}

      <main className="flex-grow pt-[70px] md:pt-[80px] relative z-10">
        
        {currentView === 'shop' && (
          <div className="max-w-[1400px] mx-auto px-2 sm:px-4 py-4">
            
            {/* --- NAYA PROFESSIONAL BANNER YAHAN HAI --- */}
            <div className="w-full rounded-xl h-[130px] md:h-[180px] relative flex flex-col justify-center px-6 md:px-10 overflow-hidden mb-6 shadow-md bg-black">
              {/* Background Image (Gym Equipment) */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470')] bg-cover bg-center opacity-50"></div>
              
              {/* Powerful Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-800/30 to-transparent"></div>
              
              {/* Banner Text (Left Aligned & Styled) */}
              <div className="relative z-10 w-full md:w-2/3 flex flex-col items-start text-left">
                <span className="inline-block px-2.5 py-0.5 bg-white text-red-700 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-sm mb-2 shadow-sm">
                  Limited Time Offer
                </span>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-1.5 drop-shadow-md">
                  New Look , <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">New Beginning</span>
                </h1>
                <p className="text-gray-100 text-[11px] md:text-sm font-medium max-w-sm drop-shadow-sm">
                  Equip yourself like a champion. Flat <span className="text-white font-bold text-lg decoration-red-500">30% OFF</span> on all premium stock.
                </p>
              </div>
            </div>

            <div className="flex overflow-x-auto no-scrollbar gap-3 md:gap-6 pb-2 mb-4 snap-x w-full border-b border-gray-200">
              {categoriesData.map((cat, idx) => (
                <div key={idx} onClick={() => setActiveCategory(cat.name)} className="flex flex-col items-center cursor-pointer group flex-shrink-0 snap-start w-[55px] md:w-[70px] pb-2">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg transition-all border bg-white ${activeCategory === cat.name ? 'border-red-600 shadow-sm text-red-600 scale-105' : 'border-gray-200 text-gray-500 group-hover:border-red-600 group-hover:text-red-600'}`}>
                    {cat.icon}
                  </div>
                  <span className={`mt-1.5 text-[9px] md:text-[10px] font-medium text-center w-full truncate ${activeCategory === cat.name ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white p-2 rounded-lg border border-gray-200 flex flex-wrap items-center justify-between gap-2 mb-4 shadow-sm">
              <div className="relative flex-1 min-w-[200px]">
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={handleSearch} className="w-full pl-8 pr-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-red-500 transition-colors" />
                <svg className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden h-7 px-2.5 bg-gray-100 text-gray-700 rounded flex items-center gap-1 text-[10px] font-bold border border-gray-200 hover:bg-gray-200">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                  Filter
                </button>
                
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-7 px-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded text-[10px] font-medium outline-none focus:border-red-500">
                  <option value="featured">Sort by Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">New Arrivals</option>
                </select>

                <button onClick={() => { setCurrentView('cart'); window.scrollTo(0,0); }} className="h-7 px-3 bg-red-600 text-white rounded flex items-center gap-1.5 text-[10px] font-bold hover:bg-red-700 transition-colors shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Cart ({cartItemsCount})
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 relative" id="shop-grid">
              
              <aside className="hidden lg:block w-48 flex-shrink-0 sticky top-[100px] bg-white rounded-lg border border-gray-200 p-4 h-fit z-20 shadow-sm">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                  <h3 className="font-bold text-xs uppercase text-gray-800">Filters</h3>
                  <button onClick={resetFilters} className="text-[9px] text-red-600 hover:text-red-800 font-bold">Clear All</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Brands</h4>
                    <div className="space-y-1.5">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2 text-[11px] text-gray-700 cursor-pointer hover:text-red-600">
                          <input type="radio" name="d-brand" checked={selectedBrand === brand} onChange={() => setSelectedBrand(brand)} className="form-radio h-3 w-3 text-red-600 border-gray-300 focus:ring-red-500" />
                          <span>{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <h4 className="font-semibold text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Max Price: Rs. {priceRange[1]}</h4>
                    <input type="range" min="0" max="15000" step="500" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full h-1.5 bg-gray-200 rounded-lg accent-red-600" />
                  </div>
                </div>
              </aside>

              {isMobileFilterOpen && (
                <div className="lg:hidden fixed inset-0 z-[80] flex flex-col justify-end">
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
                  <div className="relative bg-white w-full rounded-t-xl flex flex-col max-h-[75vh] shadow-2xl">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                      <h3 className="font-bold text-sm uppercase text-gray-800">Filters</h3>
                      <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-500 hover:text-red-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                    
                    <div className="p-5 overflow-y-auto space-y-6 flex-1">
                      <button onClick={resetFilters} className="w-full py-2 bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded mb-2 hover:bg-red-100">
                        Clear All Filters
                      </button>

                      <div>
                        <h4 className="font-bold text-xs mb-3 text-gray-500 uppercase tracking-widest">Brands</h4>
                        <div className="space-y-2">
                          {brands.map(brand => (
                            <label key={brand} className="flex items-center space-x-2 text-sm text-gray-700">
                              <input type="radio" name="m-brand" checked={selectedBrand === brand} onChange={() => setSelectedBrand(brand)} className="form-radio h-4 w-4 text-red-600 border-gray-300" />
                              <span>{brand}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs mb-3 text-gray-500 uppercase tracking-widest">Max Price: Rs. {priceRange[1]}</h4>
                        <input type="range" min="0" max="15000" step="500" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full h-1.5 bg-gray-200 rounded accent-red-600" />
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-100 bg-white">
                      <button onClick={() => { setIsMobileFilterOpen(false); showToast("Filters Applied", "success"); }} className="w-full py-3 bg-red-600 text-white text-xs font-bold uppercase rounded shadow-md hover:bg-red-700">
                        Apply Filters ({filteredProducts.length} Items)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 w-full">
                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-lg p-8 text-center border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-3">No products match your filters.</p>
                    <button onClick={resetFilters} className="px-5 py-2 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700">Clear Filters</button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
                      {displayedProducts.map((product) => (
                        <div key={product.id} onClick={() => openProductModal(product)} className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer flex flex-col group hover:border-red-400 hover:shadow-md transition-all relative h-[210px] md:h-[240px]">
                          
                          {product.discount > 0 && <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 bg-red-600 text-white text-[7px] font-bold rounded shadow-sm">-{product.discount}%</span>}
                          
                          <div className="w-full h-[120px] md:h-[130px] bg-gray-50 p-2 relative flex justify-center items-center">
                            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" loading="lazy" />
                            <button onClick={(e) => { e.stopPropagation(); openProductModal(product); }} className="absolute bottom-2 right-2 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-sm">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </button>
                          </div>

                          <div className="p-2.5 flex flex-col flex-grow border-t border-gray-100">
                            <span className="text-[8px] text-gray-400 mb-0.5 leading-none uppercase tracking-widest font-bold">{product.brand}</span>
                            <h3 className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight line-clamp-2 mb-1 min-h-[26px] group-hover:text-red-600 transition-colors">{product.name}</h3>
                            
                            <div className="flex items-center text-[8px] text-gray-500 mb-1">
                              <span className="text-yellow-400 mr-0.5">★</span> {product.rating} ({product.reviews})
                            </div>

                            <div className="mt-auto flex items-baseline gap-1">
                              <span className="text-xs font-black text-red-600">Rs.{product.price}</span>
                              {product.oldPrice && <span className="text-[8px] text-gray-400 line-through">Rs.{product.oldPrice}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredProducts.length > visibleItems && (
                      <div className="mt-6 text-center">
                        <button onClick={() => setVisibleItems(prev => prev + 12)} className="px-6 py-2 bg-white border border-gray-300 text-gray-600 text-[10px] font-bold uppercase rounded shadow-sm hover:border-red-600 hover:text-red-600 transition-colors">
                          Load More Products
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'cart' && (
          <div className="max-w-4xl mx-auto px-3 py-6 min-h-[60vh] relative z-10">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
              <h2 className="text-lg font-black text-gray-800 uppercase tracking-widest">My Cart</h2>
              <button onClick={() => setCurrentView('shop')} className="text-[10px] text-red-600 font-bold border border-red-200 px-3 py-1.5 rounded hover:bg-red-50 transition-colors">← Continue Shopping</button>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-10 text-center shadow-sm">
                <p className="text-xs text-gray-500 mb-4 font-medium">Your cart is empty.</p>
                <button onClick={() => setCurrentView('shop')} className="px-6 py-2.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 shadow-sm">Shop Now</button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-3">
                  {cart.map((item) => (
                    <div key={item.cartId} className="bg-white rounded-lg border border-gray-200 p-3 flex gap-4 shadow-sm">
                      <div className="w-20 h-24 bg-gray-50 rounded flex-shrink-0 p-1 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-xs font-bold text-gray-800 line-clamp-1 pr-2">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                          </div>
                          <div className="text-[10px] text-gray-500 mt-1 font-medium">Size: {item.selectedSize} | Color: {item.selectedColor}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-red-600">Rs. {item.price}</span>
                          <div className="flex items-center border border-gray-200 rounded h-7 w-fit bg-gray-50">
                            <button onClick={() => updateQty(item.cartId, -1)} className="px-2.5 text-gray-600 hover:text-red-600 font-bold">-</button>
                            <span className="px-2 text-[11px] border-x border-gray-200 bg-white text-gray-900 font-bold">{item.qty}</span>
                            <button onClick={() => updateQty(item.cartId, 1)} className="px-2.5 text-gray-600 hover:text-red-600 font-bold">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full md:w-64 flex-shrink-0">
                  <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-[100px] shadow-sm">
                    <h3 className="text-xs font-bold uppercase border-b border-gray-100 pb-2 mb-4 text-gray-800 tracking-wider">Order Summary</h3>
                    <div className="space-y-3 mb-4 text-[11px] text-gray-600 font-medium">
                      <div className="flex justify-between"><span>Items ({cartItemsCount})</span><span className="text-gray-900 font-bold">Rs. {cartTotal}</span></div>
                      <div className="flex justify-between"><span>Delivery</span><span className="text-red-600 font-bold">Rs. 150</span></div>
                    </div>
                    <div className="border-t border-gray-100 pt-3 mb-5 flex justify-between items-end">
                      <span className="font-bold text-[11px] text-gray-800">Total</span><span className="text-lg font-black text-red-600">Rs. {cartTotal + 150}</span>
                    </div>
                    <button onClick={() => setIsCheckoutOpen(true)} className="w-full py-3 bg-red-600 text-white text-xs font-bold rounded uppercase tracking-widest hover:bg-red-700 transition-colors shadow-md">Checkout</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>


      {selectedProduct && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 w-full max-w-xl rounded-xl flex flex-col md:flex-row relative animate-subtleZoom overflow-hidden shadow-2xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-2 right-2 z-20 text-gray-500 bg-white border border-gray-200 rounded-full p-1.5 hover:text-red-600 hover:bg-red-50 transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="w-full md:w-1/2 bg-gray-50 h-[200px] md:h-auto p-4 flex items-center justify-center border-r border-gray-100">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
            
            <div className="w-full md:w-1/2 p-5 flex flex-col">
              <h2 className="text-sm font-bold text-gray-900 leading-tight mb-1">{selectedProduct.name}</h2>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-400 text-[10px]">★★★★★</span><span className="text-[9px] text-gray-500">({selectedProduct.reviews})</span>
              </div>
              <div className="text-lg font-black text-red-600 mb-4">Rs. {selectedProduct.price}</div>
              
              <div className="mb-4">
                <span className="text-[10px] text-gray-500 block mb-1.5 font-bold uppercase tracking-widest">Color</span>
                <div className="flex gap-2">
                  {["Black", "White", "Navy", "Gray"].map(c => (
                    <button key={c} onClick={() => setModalColor(c)} className={`w-6 h-6 rounded-full border-2 ${modalColor === c ? 'border-red-600 ring-2 ring-red-200' : 'border-gray-300 hover:border-gray-400'}`} style={{ backgroundColor: c.toLowerCase() }}></button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[10px] text-gray-500 block mb-1.5 font-bold uppercase tracking-widest">Size</span>
                <div className="flex flex-wrap gap-2">
                  {modalSizes.map(s => (
                    <button key={s} onClick={() => setModalSize(s)} className={`w-8 h-8 border rounded text-[10px] font-bold transition-colors ${modalSize === s ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600'}`}>{s}</button>
                  ))}
                </div>
              </div>

              <button onClick={confirmAddToCart} className="mt-auto w-full py-3 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-md">Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 w-full max-w-sm rounded-xl p-6 relative shadow-2xl">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h2 className="text-sm font-black uppercase mb-5 text-gray-900 tracking-widest text-center">Checkout Details</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-red-500 transition-colors" placeholder="Full Name" />
              <textarea required rows="2" className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-900 placeholder-gray-400 outline-none resize-none focus:border-red-500 transition-colors" placeholder="Complete Delivery Address"></textarea>
              <input type="tel" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-red-500 transition-colors" placeholder="Phone Number (0300...)" />
              <div className="bg-red-50 p-3 rounded border border-red-100 text-xs font-bold flex justify-between text-gray-800"><span>Total to Pay (COD)</span><span className="text-red-600">Rs. {cartTotal + 150}</span></div>
              <button type="submit" className="w-full py-3.5 bg-red-600 text-white text-xs font-bold uppercase rounded shadow-md hover:bg-red-700 transition-colors tracking-widest">Confirm Order</button>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2.5 text-[11px] font-bold tracking-wide">
          <span className={`w-2.5 h-2.5 rounded-full block ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {toast.msg}
        </div>
      )}

    </div>
  );
};

export default ShopSection;