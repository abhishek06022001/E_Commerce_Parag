-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2024 at 03:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `user_id`, `quantity`, `order_id`, `createdAt`, `updatedAt`) VALUES
(3, 5, 3, 1, 376, '2024-10-27 06:53:56', '2024-10-27 06:53:56'),
(4, 3, 3, 1, 376, '2024-10-27 06:53:56', '2024-10-27 06:53:56'),
(5, 2, 3, 2, 440, '2024-10-27 11:14:28', '2024-10-27 11:14:28'),
(6, 3, 3, 2, 554, '2024-10-27 11:15:17', '2024-10-27 11:15:17'),
(7, 2, 3, 2, 554, '2024-10-27 11:15:17', '2024-10-27 11:15:17'),
(8, 2, 3, 1, 560, '2024-10-27 13:18:00', '2024-10-27 13:18:00'),
(9, 14, 3, 4, 658, '2024-10-27 17:54:03', '2024-10-27 17:54:03');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0 COMMENT '0 => not deleted, 1=> deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'sumanth jacket', 'a cotton jacket is basically made out of cotton and it is a hackets and etc', 5001, '687095_61IBBVJvSDL._AC_SY879_.jpg', 'men\'s clothing', 1, '2024-10-22 03:06:24', '2024-10-22 17:44:50'),
(2, 'Mens Shirts', 'A shirt is a shirtA shirt is a shirtA shirt is a shirtA shirt is a shirtA shirt is a shirtA shirt is a shirtA shirt is a shirtA shirt is a shirtA shirt is a shirt', 3000, '964063_Mens_Casual_Slim_Fit.jpg', 'men\'s clothing', 0, '2024-10-22 03:20:02', '2024-10-22 17:43:25'),
(3, 'A white gold', 'This is a silver ring dude\r\nWhite gold is a sophisticated and elegant metal made by alloying pure gold with white metals such as palladium, silver, or nickel, giving it a cool, silvery-white appearance. While it retains the high value and precious quality', 100000, '801245_White_Gold_Plated_Princess.jpg', 'electronics', 1, '2024-10-22 03:22:20', '2024-10-27 13:29:17'),
(4, 'Pepe image dude', 'The  Pepe is a pepe', 100, '46044_pepejpeg.jpeg', 'men\'s clothing', 1, '2024-10-22 03:23:05', '2024-10-22 17:44:46'),
(5, 'pepe day dream dude', 'pepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dude', 2000, '549410_pepe_day_dream.png', 'men\'s clothing', 1, '2024-10-22 03:24:54', '2024-10-27 13:29:10'),
(6, 'idk which ', 'idk which idk which idk which idk which idk which idk which idk which idk which idk which idk which idk which ', 1000, '454201_61IBBVJvSDL._AC_SY879_.jpg', 'electronics', 1, '2024-10-22 03:25:45', '2024-10-22 17:44:53'),
(7, 'a pepe', 'a pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepe', 10, '341701_pepe_day_dream.png', 'jewelery', 1, '2024-10-22 17:45:58', '2024-10-27 13:29:22'),
(8, 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supp', 599, '618750_acer.jpg', 'electronics', 0, '2024-10-27 14:37:36', '2024-10-27 14:37:36'),
(9, 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 110, '131433_Fjallraven_-_Foldsack_No._1_Backpack.jpg', 'men\'s clothing', 0, '2024-10-27 14:39:07', '2024-10-27 14:39:07'),
(10, 'White Gold Plated Princess', 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine\'s Day...', 10, '650699_hite_Gold_Plated_Princess.jpg', 'jewelery', 0, '2024-10-27 16:53:21', '2024-10-27 16:53:21'),
(11, 'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean\'s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.', 695, '864873_John_Hardy_Women\'s_Legends.jpg', 'jewelery', 0, '2024-10-27 16:54:18', '2024-10-27 16:54:18'),
(12, 'Mens Casual Slim Fit', 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.', 16, '10984_Mens_Casual_Premium_Slim_Fit_T-Shirts.jpg', 'men\'s clothing', 0, '2024-10-27 16:55:04', '2024-10-27 16:55:04'),
(13, 'Mens Cotton Jacket', 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, h', 56, '407204_Mens_Cotton_Jacket.jpg', 'men\'s clothing', 0, '2024-10-27 16:55:59', '2024-10-27 16:55:59'),
(14, 'Pierced Owl Rose Gold Plated Stainless Steel Double', 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel', 11, '863336_Pierced_Owl_Rose_Gold_Plated.jpg', 'jewelery', 0, '2024-10-27 16:58:11', '2024-10-27 16:58:11'),
(15, 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ', '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra', 1000, '18513_Samsung_49-Inch.jpg', 'electronics', 0, '2024-10-27 16:58:48', '2024-10-27 16:58:48'),
(16, 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making i', 109, '350156_SanDisk_SSD_PLUS.jpg', 'electronics', 0, '2024-10-27 16:59:35', '2024-10-27 16:59:35'),
(17, 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5', '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable', 109, '364705_Silicon_Power_256GB.jpg', 'electronics', 0, '2024-10-27 17:00:13', '2024-10-27 17:00:13'),
(18, 'Solid Gold Petite Micropave ', 'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.', 170, '942107_Solid_Gold_Petite_Micropave.jpg', 'jewelery', 0, '2024-10-27 17:00:55', '2024-10-27 17:00:55'),
(19, 'WD 2TB Elements Portable External Hard Drive - USB 3.0', 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on ', 64, '856321_WD_2TB_Elements_Portable_External.jpg', 'electronics', 0, '2024-10-27 17:01:40', '2024-10-27 17:01:40'),
(20, 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive', 'Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer\'s limited warranty\",\r\n    \"category\": \"electronics', 114, '526578_WD_4TB_Gaming_Drive.jpg', 'electronics', 0, '2024-10-27 17:02:57', '2024-10-27 17:02:57'),
(21, 'Phone Screen', '\r\nA phone screen is a flat, rectangular display on a mobile device that shows visuals and responds to touch input. Typically LED, OLED, or AMOLED, it combines high resolution and brightness for clear images, supporting functionalities like scrolling, typi', 20, '697021_phone-1682317_640.png', 'electronics', 0, '2024-10-28 01:51:33', '2024-10-28 01:51:33'),
(22, 'Denim Jeans', '\r\nJeans are durable, casual pants made from denim fabric, originally designed as workwear. Known for their versatility and comfort, they come in various styles like straight, slim, and bootcut, often featuring pockets, belt loops, and a zipper or button f', 100, '782506_jeans-428614_640.jpg', 'men\'s clothing', 0, '2024-10-28 01:53:29', '2024-10-28 01:53:29'),
(23, 'Laptop', 'A laptop is a portable computer with an integrated screen, keyboard, and touchpad or trackpad for on-the-go computing. It’s compact yet powerful, featuring a rechargeable battery, Wi-Fi capability, and a variety of ports', 100, '85382_keyboard-428337_640.png', 'electronics', 0, '2024-10-28 02:13:12', '2024-10-28 02:13:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0 COMMENT '0 => not deleted, 1=> deleted',
  `role` int(11) DEFAULT 0 COMMENT '0 => user, 1=> admin',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_deleted`, `role`, `createdAt`, `updatedAt`) VALUES
(2, 'yashwant   is raan', 'yashwant@gmail.com', '$2b$10$6BJ3ghqvR9vYJNfhnt3T/ejlFF1AKrSt3Ub2OT2GVTkieOk4j2kVa', 0, 1, '2024-10-21 17:32:49', '2024-10-26 09:38:05'),
(3, 'root', 'root@gmail.com', '$2b$10$kJhDeFXx3ICrnRBTxI5hqeHh/sv257Bm763CoxxiTho1wMbxKQQym', 0, 0, '2024-10-23 17:17:20', '2024-10-27 17:53:05'),
(4, 'root', 'root1@gmail.com', '$2b$10$XazCzLDhv1R94EXoGrmY3eePy0BJfmcAgso8xywh49LyZsQZFfsQy', 0, 0, '2024-10-23 17:44:23', '2024-10-23 17:44:23'),
(5, 'root', 'root2@gmail.com', '$2b$10$ZEXhdmjnYcnHeQ/xL/awIeEcxbZ9Kyk7qHiMfICnTH3wusVAZjUp.', 0, 0, '2024-10-23 17:44:37', '2024-10-23 17:44:37'),
(6, 'root', 'root4@gmail.com', '$2b$10$iWPjsDMhaJsKoc3yXEDneORSFPSt0/.BxcPX2Yv/6FXy6Gu81Vxwy', 0, 0, '2024-10-23 17:44:59', '2024-10-23 17:44:59'),
(7, 'root', 'root5@gmail.com', '$2b$10$6dFDfCp1WUSkUiOF/Xfin.8FvcMQ0hjTR5uTZqVYnDGt7haCGtVg.', 0, 0, '2024-10-23 17:45:15', '2024-10-23 17:45:15'),
(8, 'root6', 'root6@gmail.com', '$2b$10$httty..OXZCCp4BdphFaD.9bNobDG.giin1EO/0h1qDJzsIOem44m', 0, 0, '2024-10-23 17:45:48', '2024-10-23 17:45:48'),
(9, 'root7', 'root7@gmail.com', '$2b$10$fLKRurcdBnf6MFWg8GA3nOTtV9CiY4TO8eIodRUBN.RUSNeQvv6Ae', 0, 0, '2024-10-23 17:46:01', '2024-10-23 17:46:01'),
(10, 'root', 'root8@gmail.com', '$2b$10$koUPb94HX/5gIP8OKjtRiOMxNAlecPQdrnWoVwVSI29Ml5K0FYu5i', 0, 0, '2024-10-23 17:46:13', '2024-10-23 17:46:13'),
(11, 'root9', 'root9@gmail.com', '$2b$10$iER8PPvRlzLiebQ/VzkVZOXJKB/.yQb28PXPVTxXYyRhikyPgcswe', 0, 0, '2024-10-23 17:46:30', '2024-10-23 17:46:30'),
(12, 'root10', 'root10@gmail.com', '$2b$10$Jo30X5nN9oD9krazXobDMe3iILsK1oI99eR3aKLJqUkUO34AQKCAu', 0, 0, '2024-10-23 17:46:48', '2024-10-23 17:46:48'),
(13, 'root11', 'root11@gmail.com', '$2b$10$1/uLw.7urqshVMR8dHDKLOP8fqdHhfo1Stf6WTxE2HIXKNT3uHSge', 0, 0, '2024-10-23 17:47:01', '2024-10-23 17:47:01');

-- --------------------------------------------------------

--
-- Table structure for table `user_infos`
--

CREATE TABLE `user_infos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_infos`
--

INSERT INTO `user_infos` (`id`, `name`, `address`, `age`, `user_id`, `dob`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'yashwant   is raan', 'tel ke gy me rehta h ye', 24, 2, '2024-10-16', '904164_pepe_day_dream.png', '2024-10-21 17:32:49', '2024-10-26 09:38:05'),
(3, 'root', 'Lund', 23, 3, '2024-10-27', '402723_garou.jpeg', '2024-10-23 17:17:20', '2024-10-27 17:53:05'),
(4, 'root', NULL, NULL, 4, NULL, NULL, '2024-10-23 17:44:23', '2024-10-23 17:44:23'),
(5, 'root', NULL, NULL, 5, NULL, NULL, '2024-10-23 17:44:37', '2024-10-23 17:44:37'),
(6, 'root', NULL, NULL, 6, NULL, NULL, '2024-10-23 17:44:59', '2024-10-23 17:44:59'),
(7, 'root', NULL, NULL, 7, NULL, NULL, '2024-10-23 17:45:15', '2024-10-23 17:45:15'),
(8, 'root6', NULL, NULL, 8, NULL, NULL, '2024-10-23 17:45:48', '2024-10-23 17:45:48'),
(9, 'root7', NULL, NULL, 9, NULL, NULL, '2024-10-23 17:46:01', '2024-10-23 17:46:01'),
(10, 'root', NULL, NULL, 10, NULL, NULL, '2024-10-23 17:46:13', '2024-10-23 17:46:13'),
(11, 'root9', NULL, NULL, 11, NULL, NULL, '2024-10-23 17:46:30', '2024-10-23 17:46:30'),
(12, 'root10', NULL, NULL, 12, NULL, NULL, '2024-10-23 17:46:48', '2024-10-23 17:46:48'),
(13, 'root11', NULL, NULL, 13, NULL, NULL, '2024-10-23 17:47:01', '2024-10-23 17:47:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_infos`
--
ALTER TABLE `user_infos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_infos`
--
ALTER TABLE `user_infos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
