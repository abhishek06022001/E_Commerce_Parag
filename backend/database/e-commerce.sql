-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2024 at 05:28 AM
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
(3, 'A white gold', 'This is a silver ring dude\r\nWhite gold is a sophisticated and elegant metal made by alloying pure gold with white metals such as palladium, silver, or nickel, giving it a cool, silvery-white appearance. While it retains the high value and precious quality', 100000, '801245_White_Gold_Plated_Princess.jpg', 'electronics', 0, '2024-10-22 03:22:20', '2024-10-22 17:45:05'),
(4, 'Pepe image dude', 'The  Pepe is a pepe', 100, '46044_pepejpeg.jpeg', 'men\'s clothing', 1, '2024-10-22 03:23:05', '2024-10-22 17:44:46'),
(5, 'pepe day dream dude', 'pepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dudepepe day dream dude', 2000, '549410_pepe_day_dream.png', 'men\'s clothing', 0, '2024-10-22 03:24:54', '2024-10-22 17:43:30'),
(6, 'idk which ', 'idk which idk which idk which idk which idk which idk which idk which idk which idk which idk which idk which ', 1000, '454201_61IBBVJvSDL._AC_SY879_.jpg', 'electronics', 1, '2024-10-22 03:25:45', '2024-10-22 17:44:53'),
(7, 'a pepe', 'a pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepea pepe', 10, '341701_pepe_day_dream.png', 'jewelery', 0, '2024-10-22 17:45:58', '2024-10-22 17:46:21');

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
(2, 'yashwant  ', 'yashwant@gmail.com', '$2b$10$6BJ3ghqvR9vYJNfhnt3T/ejlFF1AKrSt3Ub2OT2GVTkieOk4j2kVa', 0, 1, '2024-10-21 17:32:49', '2024-10-21 18:39:35'),
(3, 'root', 'root@gmail.com', '$2b$10$kJhDeFXx3ICrnRBTxI5hqeHh/sv257Bm763CoxxiTho1wMbxKQQym', 0, 0, '2024-10-23 17:17:20', '2024-10-23 17:17:20'),
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
(2, 'yashwant  ', 'telgu ', 22, 2, '2024-10-03', '759479_pepejpeg.jpeg', '2024-10-21 17:32:49', '2024-10-21 18:39:35'),
(3, 'root', NULL, NULL, 3, NULL, NULL, '2024-10-23 17:17:20', '2024-10-23 17:17:20'),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
