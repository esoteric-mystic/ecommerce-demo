const mockProducts = [
    // Electronics
    { _id: 'e1', name: 'Apple MacBook Pro 14 Inch Space Grey', price: 160000, image: 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp', category: 'Electronics', description: 'The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple\'s M1 Pro chip for exceptional performance.', stock: 15 },
    { _id: 'e2', name: 'Huawei Matebook X Pro', price: 110000, image: 'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp', category: 'Electronics', description: 'The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience.', stock: 20 },
    { _id: 'e3', name: 'New DELL XPS 13 9300 Laptop', price: 120000, image: 'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp', category: 'Electronics', description: 'The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display.', stock: 5 },
    { _id: 'e4', name: 'Lenovo Yoga 920', price: 85000, image: 'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp', category: 'Electronics', description: 'The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet.', stock: 8 },

    // Fashion (Using Men's Shirts as they are available and stable)
    { _id: 'f1', name: 'Blue & Black Check Shirt', price: 2499, image: 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp', category: 'Fashion', description: 'Stylish and comfortable men\'s shirt featuring a classic check pattern. Suitable for both casual and semi-formal occasions.', stock: 50 },
    { _id: 'f2', name: 'Gigabyte Aorus Men Tshirt', price: 1999, image: 'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp', category: 'Fashion', description: 'Cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design.', stock: 12 },
    { _id: 'f3', name: 'Man Plaid Shirt', price: 2799, image: 'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp', category: 'Fashion', description: 'Timeless and versatile men\'s shirt with a classic plaid pattern. Comfortable fit and casual style.', stock: 25 },
    { _id: 'f4', name: 'Man Short Sleeve Shirt', price: 1599, image: 'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp', category: 'Fashion', description: 'Breezy and stylish option for warm days. With a comfortable fit and short sleeves.', stock: 10 },

    // Home
    { _id: 'h1', name: 'Annibale Colombo Bed', price: 150000, image: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp', category: 'Home', description: 'Luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.', stock: 5 },
    { _id: 'h2', name: 'Annibale Colombo Sofa', price: 200000, image: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp', category: 'Home', description: 'Sophisticated and comfortable seating option, featuring exquisite design and premium upholstery.', stock: 3 },
    { _id: 'h3', name: 'Decoration Swing', price: 4500, image: 'https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp', category: 'Home', description: 'Charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance.', stock: 7 },
    { _id: 'h4', name: 'Table Lamp', price: 3999, image: 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp', category: 'Home', description: 'Functional and decorative lighting solution. With a modern design, it provides both ambient and task lighting.', stock: 40 },

    // Beauty
    { _id: 'b1', name: 'Essence Mascara Lash Princess', price: 899, image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp', category: 'Beauty', description: 'Popular mascara known for its volumizing and lengthening effects. Cruelty-free formula.', stock: 100 },
    { _id: 'b2', name: 'Eyeshadow Palette with Mirror', price: 1599, image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp', category: 'Beauty', description: 'Versatile range of eyeshadow shades for creating stunning eye looks. Built-in mirror.', stock: 60 },
    { _id: 'b3', name: 'Red Lipstick', price: 999, image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp', category: 'Beauty', description: 'Classic and bold choice for adding a pop of color to your lips. Creamy and pigmented formula.', stock: 22 },
    { _id: 'b4', name: 'Red Nail Polish', price: 699, image: 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp', category: 'Beauty', description: 'Rich and glossy red hue for vibrant and polished nails. Quick-drying formula.', stock: 15 }
];

export default mockProducts;
