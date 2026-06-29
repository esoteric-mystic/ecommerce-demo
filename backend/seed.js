const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
    // ELECTRONICS
    { name: 'Pro X Flagship Smartphone', description: 'Ultimate smartphone with pro-grade camera, all-day battery.', price: 89999, category: 'Electronics', stock: 50, image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Studio Noise-Cancelling Headphones', description: 'Premium noise-cancelling with 40-hour battery.', price: 24999, category: 'Electronics', stock: 30, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Titanium Smartwatch Ultra', description: 'Aerospace-grade titanium, extra-long battery.', price: 45999, category: 'Electronics', stock: 45, image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?w=400', isActive: true },
    { name: '4K Ultra HD Smart TV 55"', description: 'Cinematic 4K viewing with smart connectivity.', price: 42999, category: 'Electronics', stock: 20, image: 'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?w=400', isActive: true },
    { name: 'Professional Camera DSLR', description: '24.2 MP DSLR with 18-55mm lens.', price: 55000, category: 'Electronics', stock: 15, image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?w=400', isActive: true },
    { name: 'Wireless Gaming Mouse', description: '20,000 DPI optical sensor, RGB lighting.', price: 3999, category: 'Electronics', stock: 100, image: 'https://images.pexels.com/photos/5082560/pexels-photo-5082560.jpeg?w=400', isActive: true },
    { name: 'Mechanical Keyboard RGB', description: 'Tactile switches, customizable RGB.', price: 6499, category: 'Electronics', stock: 60, image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?w=400', isActive: true },
    { name: 'Portable Bluetooth Speaker', description: '360-degree sound, waterproof design.', price: 2999, category: 'Electronics', stock: 80, image: 'https://images.pexels.com/photos/1279365/pexels-photo-1279365.jpeg?w=400', isActive: true },
    { name: 'Wireless Earbuds Pro', description: 'Active noise cancellation, 8-hour battery.', price: 12999, category: 'Electronics', stock: 75, image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Ultra-Wide Gaming Monitor', description: '34-inch curved, 144Hz refresh rate.', price: 35999, category: 'Electronics', stock: 25, image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?w=400', isActive: true },
    { name: 'Premium Tablet Pro 12.9"', description: 'Liquid Retina display for professionals.', price: 79999, category: 'Electronics', stock: 30, image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?w=400', isActive: true, isBestseller: true },
    { name: '20000mAh Power Bank', description: 'Fast charging, 3 devices simultaneously.', price: 2499, category: 'Electronics', stock: 100, image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?w=400', isActive: true },
    { name: 'USB-C Hub 7-in-1', description: 'HDMI, USB 3.0, SD card reader.', price: 3499, category: 'Electronics', stock: 65, image: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?w=400', isActive: true },
    { name: 'HD Webcam 1080p', description: 'Auto-focus, built-in microphone.', price: 4999, category: 'Electronics', stock: 55, image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?w=400', isActive: true },
    { name: 'Portable External SSD 1TB', description: 'Read speeds up to 1050MB/s.', price: 8999, category: 'Electronics', stock: 40, image: 'https://images.pexels.com/photos/4792753/pexels-photo-4792753.jpeg?w=400', isActive: true },
    { name: 'Smart Home Hub', description: 'Control all smart devices from one place.', price: 9999, category: 'Electronics', stock: 35, image: 'https://images.pexels.com/photos/4219863/pexels-photo-4219863.jpeg?w=400', isActive: true },
    { name: 'Wireless Charging Pad', description: 'Fast Qi charging, sleek design.', price: 1999, category: 'Electronics', stock: 90, image: 'https://images.pexels.com/photos/4526408/pexels-photo-4526408.jpeg?w=400', isActive: true },
    { name: 'Action Camera 4K', description: 'Waterproof, image stabilization, Wi-Fi.', price: 19999, category: 'Electronics', stock: 25, image: 'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?w=400', isActive: true },
    { name: 'E-Reader Paperwhite', description: 'Glare-free, waterproof, weeks of battery.', price: 12999, category: 'Electronics', stock: 40, image: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?w=400', isActive: true },
    { name: 'Mini Drone with Camera', description: 'Foldable, 4K camera, 30-min flight.', price: 34999, category: 'Electronics', stock: 15, image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?w=400', isActive: true },

    // CLOTHING
    { name: 'Futuristic Running Sneakers', description: 'Responsive cushioning, breathable knit.', price: 6999, category: 'Clothing', stock: 40, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Premium Cotton Hoodie', description: 'Heavyweight organic cotton.', price: 2499, category: 'Clothing', stock: 100, image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?w=400', isActive: true },
    { name: 'Classic Denim Jacket', description: 'Vintage-wash, sturdy construction.', price: 3499, category: 'Clothing', stock: 50, image: 'https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?w=400', isActive: true },
    { name: 'Slim Fit Chino Pants', description: 'Stretch cotton for all-day comfort.', price: 1999, category: 'Clothing', stock: 75, image: 'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?w=400', isActive: true },
    { name: 'Leather Chelsea Boots', description: 'Genuine leather, sleek design.', price: 4999, category: 'Clothing', stock: 35, image: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?w=400', isActive: true },
    { name: 'Floral Summer Dress', description: 'Light A-line silhouette for warm weather.', price: 2299, category: 'Clothing', stock: 60, image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?w=400', isActive: true },
    { name: 'Casual Linen Shirt', description: 'Breathable linen, relaxed fit.', price: 1799, category: 'Clothing', stock: 80, image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?w=400', isActive: true },
    { name: 'Classic Polo Shirt', description: 'Premium pique cotton.', price: 1499, category: 'Clothing', stock: 90, image: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Winter Puffer Jacket', description: 'Insulated, water-resistant.', price: 4999, category: 'Clothing', stock: 45, image: 'https://images.pexels.com/photos/6770028/pexels-photo-6770028.jpeg?w=400', isActive: true },
    { name: 'Essential Cotton T-Shirt', description: 'Soft, breathable classic fit.', price: 799, category: 'Clothing', stock: 150, image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?w=400', isActive: true },
    { name: 'Comfortable Joggers', description: 'Soft fleece, elasticated cuffs.', price: 1699, category: 'Clothing', stock: 85, image: 'https://images.pexels.com/photos/5699515/pexels-photo-5699515.jpeg?w=400', isActive: true },
    { name: 'Formal Blazer Slim Fit', description: 'Tailored fit, modern styling.', price: 5999, category: 'Clothing', stock: 30, image: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?w=400', isActive: true },
    { name: 'Athletic Sports Shorts', description: 'Quick-dry, built-in brief.', price: 999, category: 'Clothing', stock: 100, image: 'https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?w=400', isActive: true },
    { name: 'Woolen Cable Knit Sweater', description: 'Soft merino wool, classic pattern.', price: 2999, category: 'Clothing', stock: 50, image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?w=400', isActive: true },
    { name: 'Elegant Maxi Skirt', description: 'Flowing design, elastic waist.', price: 1899, category: 'Clothing', stock: 55, image: 'https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?w=400', isActive: true },
    { name: 'Cargo Pants Utility', description: 'Multiple pockets, durable cotton.', price: 2299, category: 'Clothing', stock: 65, image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?w=400', isActive: true },
    { name: 'Athletic Leggings', description: 'High-waist, moisture-wicking.', price: 1599, category: 'Clothing', stock: 80, image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Waterproof Raincoat', description: 'Lightweight, packable, sealed seams.', price: 2999, category: 'Clothing', stock: 40, image: 'https://images.pexels.com/photos/1243362/pexels-photo-1243362.jpeg?w=400', isActive: true },
    { name: 'Oxford Button-Down Shirt', description: 'Classic versatile work/casual.', price: 1999, category: 'Clothing', stock: 70, image: 'https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?w=400', isActive: true },
    { name: 'Traditional Cotton Kurta', description: 'Traditional embroidery, comfortable.', price: 1299, category: 'Clothing', stock: 75, image: 'https://images.pexels.com/photos/8347499/pexels-photo-8347499.jpeg?w=400', isActive: true },

    // HOME & KITCHEN
    { name: 'Artisan Coffee Maker', description: 'Cafe-quality brew, precise temperature.', price: 12999, category: 'Home & Kitchen', stock: 25, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Japanese Chef Knife Set', description: 'High-carbon steel, razor-sharp.', price: 7999, category: 'Home & Kitchen', stock: 20, image: 'https://images.pexels.com/photos/952478/pexels-photo-952478.jpeg?w=400', isActive: true },
    { name: 'Modern Ceramic Vase', description: 'Handcrafted matte finish.', price: 1499, category: 'Home & Kitchen', stock: 40, image: 'https://images.pexels.com/photos/2179214/pexels-photo-2179214.jpeg?w=400', isActive: true },
    { name: 'Smart Air Purifier', description: 'HEPA, removes 99.97% allergens.', price: 8999, category: 'Home & Kitchen', stock: 30, image: 'https://images.pexels.com/photos/7195394/pexels-photo-7195394.jpeg?w=400', isActive: true },
    { name: 'Luxury Cotton Bed Sheets', description: '1000 thread count Egyptian cotton.', price: 4999, category: 'Home & Kitchen', stock: 55, image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?w=400', isActive: true },
    { name: 'Cast Iron Skillet', description: 'Pre-seasoned, lifetime durability.', price: 2499, category: 'Home & Kitchen', stock: 60, image: 'https://images.pexels.com/photos/4252152/pexels-photo-4252152.jpeg?w=400', isActive: true },
    { name: 'Robot Vacuum Cleaner', description: 'Smart mapping, auto-charging.', price: 18999, category: 'Home & Kitchen', stock: 20, image: 'https://images.pexels.com/photos/6444255/pexels-photo-6444255.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Electric Kettle Premium', description: 'Rapid boil, temperature control.', price: 2499, category: 'Home & Kitchen', stock: 45, image: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?w=400', isActive: true },
    { name: 'High-Speed Blender', description: 'Variable speed, pulse function.', price: 5999, category: 'Home & Kitchen', stock: 35, image: 'https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?w=400', isActive: true },
    { name: 'Stainless Steel Toaster', description: '4-slice, multiple browning settings.', price: 3499, category: 'Home & Kitchen', stock: 50, image: 'https://images.pexels.com/photos/4551975/pexels-photo-4551975.jpeg?w=400', isActive: true },
    { name: 'Non-Stick Cookware Set', description: '10-piece, dishwasher safe.', price: 6999, category: 'Home & Kitchen', stock: 25, image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Instant Pressure Cooker', description: 'Multi-functional, 7-in-1.', price: 7999, category: 'Home & Kitchen', stock: 30, image: 'https://images.pexels.com/photos/4226870/pexels-photo-4226870.jpeg?w=400', isActive: true },
    { name: 'Digital Rice Cooker', description: 'Fuzzy logic, keep warm function.', price: 4999, category: 'Home & Kitchen', stock: 40, image: 'https://images.pexels.com/photos/6996084/pexels-photo-6996084.jpeg?w=400', isActive: true },
    { name: 'Stand Mixer Professional', description: '10 speeds, includes attachments.', price: 15999, category: 'Home & Kitchen', stock: 15, image: 'https://images.pexels.com/photos/4224305/pexels-photo-4224305.jpeg?w=400', isActive: true },
    { name: 'RO Water Purifier', description: 'RO+UV, TDS controller.', price: 12999, category: 'Home & Kitchen', stock: 25, image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?w=400', isActive: true },
    { name: 'Induction Cooktop', description: 'Energy-efficient, precise control.', price: 3999, category: 'Home & Kitchen', stock: 50, image: 'https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?w=400', isActive: true },
    { name: 'Food Storage Container Set', description: 'Airtight, BPA-free.', price: 1499, category: 'Home & Kitchen', stock: 80, image: 'https://images.pexels.com/photos/4226886/pexels-photo-4226886.jpeg?w=400', isActive: true },
    { name: 'Bone China Dinner Set', description: '24-piece, elegant floral design.', price: 8999, category: 'Home & Kitchen', stock: 20, image: 'https://images.pexels.com/photos/6270541/pexels-photo-6270541.jpeg?w=400', isActive: true },
    { name: 'Modern Table Lamp', description: 'Touch dimmer, fabric shade.', price: 2999, category: 'Home & Kitchen', stock: 45, image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?w=400', isActive: true },
    { name: 'Decorative Wall Clock', description: 'Silent sweep, modern design.', price: 1999, category: 'Home & Kitchen', stock: 60, image: 'https://images.pexels.com/photos/210590/pexels-photo-210590.jpeg?w=400', isActive: true },

    // ACCESSORIES
    { name: 'Classic Leather Wallet', description: 'Hand-stitched, RFID protection.', price: 1499, category: 'Accessories', stock: 60, image: 'https://images.pexels.com/photos/915915/pexels-photo-915915.jpeg?w=400', isActive: true },
    { name: 'Canvas Travel Tote', description: 'Durable, spacious, stylish.', price: 2999, category: 'Accessories', stock: 40, image: 'https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?w=400', isActive: true },
    { name: 'Minimalist Watch', description: 'Stainless steel mesh, water-resistant.', price: 5999, category: 'Accessories', stock: 30, image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Premium Laptop Backpack', description: 'Water-resistant, USB charging port.', price: 2499, category: 'Accessories', stock: 55, image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?w=400', isActive: true },
    { name: 'Silk Scarf Collection', description: 'Hand-printed, luxurious.', price: 1999, category: 'Accessories', stock: 35, image: 'https://images.pexels.com/photos/4947788/pexels-photo-4947788.jpeg?w=400', isActive: true },
    { name: 'Designer Sunglasses', description: 'UV400 protection, acetate frame.', price: 3999, category: 'Accessories', stock: 45, image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?w=400', isActive: true },
    { name: 'Genuine Leather Belt', description: 'Brushed nickel buckle.', price: 999, category: 'Accessories', stock: 80, image: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?w=400', isActive: true },
    { name: 'Silk Tie Collection', description: 'Premium silk, classic patterns.', price: 1299, category: 'Accessories', stock: 50, image: 'https://images.pexels.com/photos/45056/pexels-photo-45056.jpeg?w=400', isActive: true },
    { name: 'Pearl Drop Earrings', description: 'Freshwater pearl, sterling silver.', price: 2499, category: 'Accessories', stock: 40, image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?w=400', isActive: true },
    { name: 'Gold Pendant Necklace', description: 'Gold-plated, minimalist design.', price: 1999, category: 'Accessories', stock: 35, image: 'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Beaded Bracelet Set', description: 'Natural stones, adjustable.', price: 799, category: 'Accessories', stock: 70, image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?w=400', isActive: true },
    { name: 'Premium Phone Case', description: 'Shock-absorbing, wireless charging.', price: 999, category: 'Accessories', stock: 100, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?w=400', isActive: true },
    { name: 'Leather Keychain', description: 'Handcrafted, ages beautifully.', price: 399, category: 'Accessories', stock: 90, image: 'https://images.pexels.com/photos/4638866/pexels-photo-4638866.jpeg?w=400', isActive: true },
    { name: 'Cotton Headband Set', description: '5 colors, perfect for workouts.', price: 499, category: 'Accessories', stock: 75, image: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?w=400', isActive: true },
    { name: 'Wool Beanie Cap', description: 'Merino wool, cuffed hem.', price: 699, category: 'Accessories', stock: 65, image: 'https://images.pexels.com/photos/1868735/pexels-photo-1868735.jpeg?w=400', isActive: true },
    { name: 'Leather Touchscreen Gloves', description: 'Touchscreen fingertips, fleece-lined.', price: 1499, category: 'Accessories', stock: 40, image: 'https://images.pexels.com/photos/45057/pexels-photo-45057.jpeg?w=400', isActive: true },
    { name: 'Automatic Umbrella', description: 'Compact, windproof, one-click.', price: 799, category: 'Accessories', stock: 85, image: 'https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?w=400', isActive: true },
    { name: 'Leather Passport Holder', description: 'RFID-blocking, multiple slots.', price: 899, category: 'Accessories', stock: 55, image: 'https://images.pexels.com/photos/5442463/pexels-photo-5442463.jpeg?w=400', isActive: true },
    { name: 'Canvas Messenger Bag', description: 'Vintage-style, leather trim.', price: 2999, category: 'Accessories', stock: 35, image: 'https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?w=400', isActive: true },
    { name: 'Crossbody Phone Bag', description: 'Compact, adjustable strap.', price: 1299, category: 'Accessories', stock: 60, image: 'https://images.pexels.com/photos/5711897/pexels-photo-5711897.jpeg?w=400', isActive: true },

    // BEAUTY & WELLNESS
    { name: 'Radiance Skincare Set', description: 'Cleanser, serum, moisturizer.', price: 3499, category: 'Beauty & Wellness', stock: 50, image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Aromatherapy Diffuser', description: 'Ultrasonic, LED mood lighting.', price: 1999, category: 'Beauty & Wellness', stock: 45, image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=400', isActive: true },
    { name: 'Professional Hair Dryer', description: 'Ionic technology, 50% faster dry.', price: 4999, category: 'Beauty & Wellness', stock: 35, image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?w=400', isActive: true },
    { name: 'Luxury Perfume Collection', description: 'Bergamot, jasmine, sandalwood.', price: 5999, category: 'Beauty & Wellness', stock: 40, image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?w=400', isActive: true },
    { name: 'Gentle Foam Face Wash', description: 'pH-balanced, all skin types.', price: 499, category: 'Beauty & Wellness', stock: 100, image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?w=400', isActive: true },
    { name: 'SPF 50 Sunscreen Lotion', description: 'Broad-spectrum, water-resistant.', price: 699, category: 'Beauty & Wellness', stock: 90, image: 'https://images.pexels.com/photos/5938416/pexels-photo-5938416.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Moisturizing Lip Balm Set', description: '4 flavors, SPF protection.', price: 399, category: 'Beauty & Wellness', stock: 120, image: 'https://images.pexels.com/photos/4041387/pexels-photo-4041387.jpeg?w=400', isActive: true },
    { name: 'Volumizing Mascara', description: 'Smudge-proof, long-lasting.', price: 899, category: 'Beauty & Wellness', stock: 75, image: 'https://images.pexels.com/photos/2637820/pexels-photo-2637820.jpeg?w=400', isActive: true },
    { name: 'Liquid Foundation', description: 'Buildable coverage, 20 shades.', price: 1299, category: 'Beauty & Wellness', stock: 60, image: 'https://images.pexels.com/photos/2688991/pexels-photo-2688991.jpeg?w=400', isActive: true },
    { name: 'Nail Polish Set 12 Colors', description: 'Chip-resistant, quick-dry.', price: 799, category: 'Beauty & Wellness', stock: 80, image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg?w=400', isActive: true },
    { name: 'Sheet Mask Variety Pack', description: '10 masks, instant refresh.', price: 599, category: 'Beauty & Wellness', stock: 95, image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?w=400', isActive: true },
    { name: 'Nourishing Body Lotion', description: 'Shea butter, vitamin E.', price: 599, category: 'Beauty & Wellness', stock: 85, image: 'https://images.pexels.com/photos/6621460/pexels-photo-6621460.jpeg?w=400', isActive: true },
    { name: 'Hair Repair Serum', description: 'Heat protection, frizz control.', price: 899, category: 'Beauty & Wellness', stock: 55, image: 'https://images.pexels.com/photos/8467971/pexels-photo-8467971.jpeg?w=400', isActive: true },
    { name: 'Beard Grooming Kit', description: 'Oil, balm, brush, comb.', price: 1499, category: 'Beauty & Wellness', stock: 40, image: 'https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?w=400', isActive: true },
    { name: 'Professional Makeup Brush Set', description: '15-piece, travel case.', price: 1999, category: 'Beauty & Wellness', stock: 45, image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Anti-Aging Eye Cream', description: 'Retinol, peptides, reduces lines.', price: 1499, category: 'Beauty & Wellness', stock: 50, image: 'https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?w=400', isActive: true },
    { name: 'Exfoliating Face Scrub', description: 'Natural beads, brighter skin.', price: 599, category: 'Beauty & Wellness', stock: 70, image: 'https://images.pexels.com/photos/6621483/pexels-photo-6621483.jpeg?w=400', isActive: true },
    { name: 'Hydrating Facial Toner', description: 'Hyaluronic acid, alcohol-free.', price: 699, category: 'Beauty & Wellness', stock: 65, image: 'https://images.pexels.com/photos/6621470/pexels-photo-6621470.jpeg?w=400', isActive: true },
    { name: 'Daily Moisturizer SPF 30', description: 'Lightweight sun protection.', price: 799, category: 'Beauty & Wellness', stock: 80, image: 'https://images.pexels.com/photos/6621489/pexels-photo-6621489.jpeg?w=400', isActive: true },
    { name: 'Intensive Hand Cream', description: 'Fast-absorbing, long-lasting.', price: 399, category: 'Beauty & Wellness', stock: 90, image: 'https://images.pexels.com/photos/6621479/pexels-photo-6621479.jpeg?w=400', isActive: true },

    // SPORTS & FITNESS
    { name: 'Eco-Friendly Yoga Mat', description: 'Natural rubber, non-slip.', price: 2999, category: 'Sports & Fitness', stock: 70, image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?w=400', isActive: true },
    { name: 'Adjustable Dumbbell Pair', description: '2kg to 24kg, space-saving.', price: 15999, category: 'Sports & Fitness', stock: 15, image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Organic Protein Powder', description: 'Plant-based, 20g protein.', price: 2499, category: 'Sports & Fitness', stock: 100, image: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?w=400', isActive: true },
    { name: 'Smart Fitness Tracker', description: 'Heart rate, sleep, 7-day battery.', price: 3999, category: 'Sports & Fitness', stock: 60, image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Resistance Bands Set', description: '5 levels, portable.', price: 999, category: 'Sports & Fitness', stock: 90, image: 'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?w=400', isActive: true },
    { name: 'Speed Jump Rope', description: 'Ball bearings, adjustable length.', price: 599, category: 'Sports & Fitness', stock: 80, image: 'https://images.pexels.com/photos/7188034/pexels-photo-7188034.jpeg?w=400', isActive: true },
    { name: 'High-Density Foam Roller', description: 'Muscle recovery, EVA foam.', price: 1299, category: 'Sports & Fitness', stock: 55, image: 'https://images.pexels.com/photos/6551097/pexels-photo-6551097.jpeg?w=400', isActive: true },
    { name: 'Cast Iron Kettlebell 16kg', description: 'Powder coated, full-body workouts.', price: 2499, category: 'Sports & Fitness', stock: 35, image: 'https://images.pexels.com/photos/4164512/pexels-photo-4164512.jpeg?w=400', isActive: true },
    { name: 'Anti-Burst Exercise Ball', description: 'Pro-grade, tested to 300kg.', price: 1499, category: 'Sports & Fitness', stock: 45, image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?w=400', isActive: true },
    { name: 'Doorframe Pull-Up Bar', description: 'No-screw, multiple grips.', price: 1999, category: 'Sports & Fitness', stock: 40, image: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?w=400', isActive: true },
    { name: 'Adjustable Weight Bench', description: 'Multi-position, steel frame.', price: 8999, category: 'Sports & Fitness', stock: 20, image: 'https://images.pexels.com/photos/4164513/pexels-photo-4164513.jpeg?w=400', isActive: true },
    { name: 'Padded Cycling Shorts', description: 'Gel padding, moisture-wicking.', price: 1799, category: 'Sports & Fitness', stock: 50, image: 'https://images.pexels.com/photos/5807539/pexels-photo-5807539.jpeg?w=400', isActive: true },
    { name: 'Anti-Fog Swimming Goggles', description: 'UV protection, adjustable strap.', price: 899, category: 'Sports & Fitness', stock: 65, image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?w=400', isActive: true },
    { name: 'Professional Tennis Racket', description: 'Lightweight graphite.', price: 4999, category: 'Sports & Fitness', stock: 25, image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=400', isActive: true },
    { name: 'Badminton Set Complete', description: '2 rackets, 3 shuttlecocks.', price: 1499, category: 'Sports & Fitness', stock: 40, image: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?w=400', isActive: true },
    { name: 'Official Size Football', description: 'FIFA-quality, all surfaces.', price: 1299, category: 'Sports & Fitness', stock: 55, image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=400', isActive: true, isBestseller: true },
    { name: 'Indoor/Outdoor Basketball', description: 'Composite leather, official size.', price: 1499, category: 'Sports & Fitness', stock: 45, image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?w=400', isActive: true },
    { name: 'Slim Running Belt', description: 'Water-resistant, reflective.', price: 699, category: 'Sports & Fitness', stock: 70, image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?w=400', isActive: true },
    { name: 'Adjustable Ankle Weights', description: '1-5kg each, velcro straps.', price: 1299, category: 'Sports & Fitness', stock: 50, image: 'https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?w=400', isActive: true },
    { name: 'Sports Gym Bag', description: 'Shoe compartment, wet pocket.', price: 1999, category: 'Sports & Fitness', stock: 60, image: 'https://images.pexels.com/photos/5698440/pexels-photo-5698440.jpeg?w=400', isActive: true }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');
        console.log('Connected to MongoDB');
        await Product.deleteMany({});
        console.log('Cleared existing products');
        await Product.insertMany(products);
        console.log(`Seeded ${products.length} products successfully!`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

seedDatabase();
