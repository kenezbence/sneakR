-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 02, 2024 at 12:47 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sneakr`
--
CREATE DATABASE IF NOT EXISTS `sneakr` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `sneakr`;

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `getAllShoes`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllShoes` ()   SELECT nev AS `Cipők`, cipok.img AS Kép FROM cipok$$

DROP PROCEDURE IF EXISTS `getShoesDetails`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getShoesDetails` (IN `tipusIN` ENUM('férfi','női','uniszex'))   SELECT cipok.nev AS Cipők, markak.nev AS MárkaNevek, nemek.tipus AS Típusok, cipok.img AS Kép FROM `cipok` INNER JOIN `nemek` ON `cipok`.`nem_id` = `nemek`.`id` INNER JOIN `markak` ON `cipok`.`marka_id` = `markak`.`id` WHERE nemek.tipus = tipusIN$$

DROP PROCEDURE IF EXISTS `getShoesNameBrand`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getShoesNameBrand` ()   SELECT cipok.nev AS `Cipők`, markak.nev AS `Márkanevek`, cipok.img AS Kép FROM `cipok` INNER JOIN `markak` ON `cipok`.`marka_id` = `markak`.`id`$$

DROP PROCEDURE IF EXISTS `getShoesNamePrice`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getShoesNamePrice` ()   SELECT `nev` AS Cipők, `ar` AS Ár, cipok.img AS Kép FROM `cipok`$$

DROP PROCEDURE IF EXISTS `listNewShoes`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listNewShoes` (IN `tipusIN` ENUM('férfi','női','uniszex'))   SELECT cipok.nev AS Cipők, markak.nev AS MárkaNevek, nemek.tipus AS Típusok, cipok.allapot AS Állapot, cipok.img AS Kép FROM `cipok` INNER JOIN `nemek` ON `cipok`.`nem_id` = `nemek`.`id` INNER JOIN `markak` ON `cipok`.`marka_id` = `markak`.`id` WHERE nemek.tipus = tipusIN AND cipok.allapot = "új"$$

DROP PROCEDURE IF EXISTS `listShoesPriceASC`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listShoesPriceASC` ()   SELECT `nev` AS Cipők, `ar` AS Ár, cipok.img AS Kép FROM `cipok` ORDER BY Ár ASC$$

DROP PROCEDURE IF EXISTS `listShoesPriceDESC`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listShoesPriceDESC` ()   SELECT `nev` AS Cipők, `ar` AS Ár, cipok.img AS Kép FROM `cipok` ORDER BY Ár DESC$$

DROP PROCEDURE IF EXISTS `listUsedShoes`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listUsedShoes` (IN `tipusIN` ENUM('férfi','női','uniszex'))   SELECT cipok.nev AS Cipők, markak.nev AS MárkaNevek, nemek.tipus AS Típusok, cipok.allapot AS Állapot, cipok.img AS Kép FROM `cipok` INNER JOIN `nemek` ON `cipok`.`nem_id` = `nemek`.`id` INNER JOIN `markak` ON `cipok`.`marka_id` = `markak`.`id` WHERE nemek.tipus = tipusIN AND cipok.allapot = "használt"$$

DROP PROCEDURE IF EXISTS `login`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `emailIN` VARCHAR(255), IN `passwordIN` VARCHAR(255))   SELECT * FROM userek WHERE userek.email = emailIN AND userek.jelszo = passwordIN$$

DROP PROCEDURE IF EXISTS `registerUser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `registerUser` (IN `nevIN` VARCHAR(255), IN `emailIN` VARCHAR(255), IN `jelszoIN` VARCHAR(255))   INSERT INTO `userek` (`id`, `nev`, `email`, `jelszo`, `admin`) VALUES (NULL, nevIN, emailIN, jelszoIN, "nem")$$

DROP PROCEDURE IF EXISTS `searchShoeByBrand`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `searchShoeByBrand` (IN `markaIN` VARCHAR(255))   SELECT cipok.nev AS Cipők, markak.nev AS Márka, cipok.ar AS Ár, cipok.img AS Kép
FROM cipok INNER JOIN markak ON cipok.marka_id = markak.id
WHERE markak.nev LIKE Concat('%',markaIN,'%')$$

DROP PROCEDURE IF EXISTS `searchShoeByName`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `searchShoeByName` (IN `cipoIN` VARCHAR(255))   SELECT cipok.nev AS Cipők, markak.nev AS Márka, cipok.ar AS Ár, cipok.img AS Kép
FROM cipok INNER JOIN markak ON cipok.marka_id = markak.id
WHERE cipok.nev LIKE Concat('%',cipoIN,'%')$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `akciok`
--

DROP TABLE IF EXISTS `akciok`;
CREATE TABLE `akciok` (
  `id` int(11) NOT NULL,
  `tipus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `akciok`
--

INSERT INTO `akciok` (`id`, `tipus`) VALUES
(1, '50% kedvezmény'),
(2, '20% kedvezmény'),
(3, 'Ingyenes szállítás');

-- --------------------------------------------------------

--
-- Table structure for table `cipok`
--

DROP TABLE IF EXISTS `cipok`;
CREATE TABLE `cipok` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) DEFAULT NULL,
  `marka_id` int(11) DEFAULT NULL,
  `nem_id` int(11) DEFAULT NULL,
  `allapot` enum('új','használt') DEFAULT NULL,
  `meret_id` int(11) DEFAULT NULL,
  `ar` float DEFAULT NULL,
  `akcio_id` int(11) DEFAULT NULL,
  `exkluziv_id` int(11) DEFAULT NULL,
  `ujdonsag_id` int(11) DEFAULT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cipok`
--

INSERT INTO `cipok` (`id`, `nev`, `marka_id`, `nem_id`, `allapot`, `meret_id`, `ar`, `akcio_id`, `exkluziv_id`, `ujdonsag_id`, `img`) VALUES
(1, 'Air Max 90', 1, 1, 'új', 4, 25000, 1, 1, 1, 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/a7f07bf7-7896-48c7-b53d-ab5daf86f84e/NIKE+AIR+MAX+EXCEE.png'),
(2, 'Ultraboost ', 2, 2, 'használt', 3, 15000, 2, NULL, NULL, 'https://www.shooos.hu/media/catalog/product/cache/5/image/1350x778/9df78eab33525d08d6e5fb8d27136e95/a/d/adidas-ultraboost-22-w-gx55911.jpg'),
(3, 'Smash V2 Classic Leather', 3, 1, 'új', 5, 20000, NULL, 2, 2, 'https://shoecity.com/cdn/shop/products/0450209_01_1000x.jpg?v=1674060650'),
(4, 'Chuck Taylor All Star', 5, 2, 'új', 6, 18000, NULL, NULL, 1, 'https://dr9l7gb9cebpv.cloudfront.net/media/catalog/product/cache/2774d42b8e55ba58cfe3fc9632392955/m/9/m9160_a_107x1.jpg'),
(5, 'Jumpman MVP', 6, 1, 'új', 5, 69900, NULL, NULL, NULL, 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6ede48e2-7cfa-4a17-8ccf-f0ae3f851a46/JORDAN+MVP.png'),
(6, 'True Flight', 6, 1, 'használt', 6, 45000, 3, NULL, NULL, 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/69d62417-8464-4f98-9489-efafa96de6b1/JORDAN+TRUE+FLIGHT.png'),
(7, 'Air Zoom Alpha', 1, 1, 'új', 6, 74900, NULL, NULL, NULL, 'https://cdn-images.farfetch-contents.com/13/86/15/44/13861544_21694244_1000.jpg'),
(8, 'Classic Stan', 2, 2, 'új', 5, 53900, NULL, NULL, NULL, 'https://photos6.spartoo.hu/photos/188/18898694/adidas-Originals-STAN-SMITH-18898694_1200_A.jpg'),
(9, 'Velocity Nitro 3', 3, 1, 'új', 4, 45900, NULL, NULL, NULL, 'https://img01.ztat.net/article/spp-media-p1/d629e4e5ae284e0fbe6cec2ab0138732/4d1dce999ad248ed8d539805e59bd9ab.jpg?imwidth=1800&filter=packshot'),
(10, 'Legacy', 4, 3, 'használt', 6, 61900, NULL, NULL, NULL, 'https://www.shooos.hu/media/catalog/product/cache/5/image/1350x778/9df78eab33525d08d6e5fb8d27136e95/h/6/h686511.jpg'),
(11, 'El Distrito 2.0', 5, 2, 'új', 3, 29900, NULL, NULL, NULL, 'https://i.sportisimo.com/products/images/1944/1944552/700x700/converse-el-distrito-2-0_3.jpeg'),
(12, 'Fly', 6, 1, 'új', 5, 112900, NULL, NULL, NULL, 'https://ro.basketzone.net/zdjecia/2018/04/11/304/49/NIKE_AIR_JORDAN_FLY_LOCKDOWN_BLACK_TECH_GREY_k.png'),
(13, 'Boost 350 V2 Core Black Red', 7, 3, 'új', 4, 129900, NULL, NULL, NULL, 'https://www.truetosole.hu/cdn/shop/products/True-to-Sole-AdidasYeezyBoost350V2CoreBlackRed-_BY9612_-01_1000x600.png?v=1659452309'),
(14, 'New Balance 530', 8, 1, 'új', 6, 65900, NULL, NULL, NULL, 'https://plugsneakrs.com/cdn/shop/files/new-balance-530-white-sky-blue-708985.webp?v=1716162217'),
(15, 'McQueen Court', 9, 2, 'új', 5, 94900, NULL, NULL, NULL, 'https://www.levelshoes.com/media/catalog/product/cache/d6b308721eea44dce854000e2ac7b2ba/6/3/634619wia9a9086_1.jpg'),
(16, 'Travis Scott Air Max', 10, 3, 'új', 3, 115000, NULL, NULL, 2, 'https://balazskicks.com/cdn/shop/products/nike-air-max-1-travis-scott-baroque-brown-1-1000.png?v=1654189942&width=2048'),
(17, 'Nike Air Force 1', 1, 3, 'új', 5, 75900, NULL, NULL, NULL, 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+\'07.png'),
(18, 'Adidas Superstar Ot Tech', 2, 2, 'használt', 4, 49900, NULL, NULL, NULL, 'https://cipopakk.hu/UserFiles/Product/f3ac61d094cc291b2f26c45dfd195ada-1649234860.jpg'),
(19, 'Puma RS-X', 3, 1, 'új', 6, 58900, NULL, NULL, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoODvuUw1D6IM5C0jSsp4mCYK_rcQ3MZG3fQ&s'),
(20, 'Classic Leather', 4, 3, 'új', 3, 41900, NULL, NULL, NULL, 'https://img01.ztat.net/article/spp-media-p1/8da7e81ae96940dbabd43af93f935c8d/ecaab32d07a94317942b968750daaf50.jpg?imwidth=1800&filter=packshot'),
(21, 'Run Star', 5, 2, 'használt', 2, 32900, NULL, NULL, NULL, 'https://static.supersklep.hu/1245976-converse-run-star-motion-cipk-black.jpg?w=1920'),
(22, 'Retro 4', 6, 1, 'új', 6, 122900, NULL, NULL, NULL, 'https://www.truetosole.hu/cdn/shop/products/TruetoSole-AirJordan4RetroMilitaryBlack-DH6927-111-01_1000x600.png?v=1652364461'),
(23, 'Yeezy Slide', 7, 3, 'új', 5, 36900, NULL, NULL, NULL, 'https://www.truetosole.hu/cdn/shop/products/True-to-Sole-AdidasYeezySlideBone_2022Restock_FZ5897_-01_1000x600.png?v=1664928022'),
(24, 'New Balance 550', 8, 1, 'használt', 4, 52900, NULL, NULL, NULL, 'https://balazskicks.com/cdn/shop/products/image_3317acb1-f13b-43ce-81b4-3c511d7e87f7.png?v=1702321424&width=2048'),
(25, 'Alexander McQueen Oversized', 9, 2, 'új', 6, 109900, NULL, NULL, NULL, 'https://cdn-images.farfetch-contents.com/17/00/05/02/17000502_54597539_600.jpg'),
(26, 'Travis Scott Dunk', 10, 3, 'új', 5, 129000, NULL, NULL, NULL, 'https://en.grailpoint.com/wp-content/uploads/2024/01/nike-sb-dunk-low-travis-scott.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `exkluzivok`
--

DROP TABLE IF EXISTS `exkluzivok`;
CREATE TABLE `exkluzivok` (
  `id` int(11) NOT NULL,
  `tipus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exkluzivok`
--

INSERT INTO `exkluzivok` (`id`, `tipus`) VALUES
(1, 'Limitált kiadás'),
(2, 'Különleges színkombináció'),
(3, 'Exkluzív anyag');

-- --------------------------------------------------------

--
-- Table structure for table `kiegeszitok`
--

DROP TABLE IF EXISTS `kiegeszitok`;
CREATE TABLE `kiegeszitok` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kiegeszitok`
--

INSERT INTO `kiegeszitok` (`id`, `nev`) VALUES
(1, 'Sneaker Shield'),
(2, 'Cipőálpolási termékek'),
(3, 'Fűzők'),
(4, 'Ajándékutalványok');

-- --------------------------------------------------------

--
-- Table structure for table `kuponkodok`
--

DROP TABLE IF EXISTS `kuponkodok`;
CREATE TABLE `kuponkodok` (
  `id` int(11) NOT NULL,
  `kod` varchar(255) DEFAULT NULL,
  `kedvezmeny_szazalek` int(11) DEFAULT NULL,
  `ervenyes_tol` date DEFAULT NULL,
  `ervenyes_ig` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kuponkodok`
--

INSERT INTO `kuponkodok` (`id`, `kod`, `kedvezmeny_szazalek`, `ervenyes_tol`, `ervenyes_ig`) VALUES
(1, '10PERCENTOFF', 10, '2024-10-07', '2024-10-31');

-- --------------------------------------------------------

--
-- Table structure for table `lakcimek`
--

DROP TABLE IF EXISTS `lakcimek`;
CREATE TABLE `lakcimek` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `orszag` varchar(255) DEFAULT NULL,
  `varos` varchar(255) DEFAULT NULL,
  `iranyitoszam` varchar(255) DEFAULT NULL,
  `utca` varchar(255) DEFAULT NULL,
  `hazszam` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lakcimek`
--

INSERT INTO `lakcimek` (`id`, `user_id`, `orszag`, `varos`, `iranyitoszam`, `utca`, `hazszam`) VALUES
(1, 1, 'Magyarország', 'Budapest', '1011', 'Vár utca', '12'),
(2, 2, 'Magyarország', 'Szeged', '6720', 'Kárász utca', '5'),
(3, 3, 'Magyarország', 'Debrecen', '4026', 'Nagyerdei körút', '24');

-- --------------------------------------------------------

--
-- Table structure for table `markak`
--

DROP TABLE IF EXISTS `markak`;
CREATE TABLE `markak` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `markak`
--

INSERT INTO `markak` (`id`, `nev`) VALUES
(1, 'Nike'),
(2, 'Adidas'),
(3, 'Puma'),
(4, 'Reebok'),
(5, 'Converse'),
(6, 'Jordan'),
(7, 'Yeezy'),
(8, 'New Balance'),
(9, 'Alexander McQueen'),
(10, 'Travis Scott');

-- --------------------------------------------------------

--
-- Table structure for table `meretek`
--

DROP TABLE IF EXISTS `meretek`;
CREATE TABLE `meretek` (
  `id` int(11) NOT NULL,
  `leiras` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `meretek`
--

INSERT INTO `meretek` (`id`, `leiras`) VALUES
(1, '38'),
(2, '39'),
(3, '40'),
(4, '41'),
(5, '42'),
(6, '43');

-- --------------------------------------------------------

--
-- Table structure for table `nemek`
--

DROP TABLE IF EXISTS `nemek`;
CREATE TABLE `nemek` (
  `id` int(11) NOT NULL,
  `tipus` varchar(255) DEFAULT NULL,
  `nem` enum('férfi','nő') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nemek`
--

INSERT INTO `nemek` (`id`, `tipus`, `nem`) VALUES
(1, 'férfi', 'férfi'),
(2, 'női', 'nő'),
(3, 'uniszex', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rendelesek`
--

DROP TABLE IF EXISTS `rendelesek`;
CREATE TABLE `rendelesek` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `szallitasi_cim_id` int(11) DEFAULT NULL,
  `rendeles_datum` date DEFAULT NULL,
  `szallitas_id` int(11) DEFAULT NULL,
  `kuponkod_id` int(11) DEFAULT NULL,
  `rendeles_allapot` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `rendeles_tetelek`
--

DROP TABLE IF EXISTS `rendeles_tetelek`;
CREATE TABLE `rendeles_tetelek` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `cipok_id` int(11) DEFAULT NULL,
  `mennyiseg` int(11) DEFAULT NULL,
  `ar` float DEFAULT NULL,
  `rendeles_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shopping_session`
--

DROP TABLE IF EXISTS `shopping_session`;
CREATE TABLE `shopping_session` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `session_start` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `cipok_id` int(11) DEFAULT NULL,
  `mennyiseg` int(11) DEFAULT NULL,
  `ar` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `szallitasok`
--

DROP TABLE IF EXISTS `szallitasok`;
CREATE TABLE `szallitasok` (
  `id` int(11) NOT NULL,
  `tipus` varchar(255) DEFAULT NULL,
  `ar` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ujdonsagok`
--

DROP TABLE IF EXISTS `ujdonsagok`;
CREATE TABLE `ujdonsagok` (
  `id` int(11) NOT NULL,
  `tipus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ujdonsagok`
--

INSERT INTO `ujdonsagok` (`id`, `tipus`) VALUES
(1, 'Új kollekció'),
(2, '2024-es modell');

-- --------------------------------------------------------

--
-- Table structure for table `userek`
--

DROP TABLE IF EXISTS `userek`;
CREATE TABLE `userek` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `jelszo` varchar(255) DEFAULT NULL,
  `admin` varchar(255) DEFAULT 'nem'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userek`
--

INSERT INTO `userek` (`id`, `nev`, `email`, `jelszo`, `admin`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'password123', 'nem'),
(2, 'Jane Smith', 'jane.smith@example.com', 'securepass', 'nem'),
(3, 'Admin User', 'admin@example.com', 'adminpass', 'igen'),
(4, 'Kiss Lajos', 'lajoskiss1@gmail.com', 'Alma123!', 'nem'),
(5, 'Péter Aladár', 'petialadar@gmail.com', 'petike12345', 'nem'),
(6, 'Nagy Zsombor', 'nagyzsombi@gmail.com', 'zsombika12345', 'nem');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akciok`
--
ALTER TABLE `akciok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cipok`
--
ALTER TABLE `cipok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_marka_id` (`marka_id`),
  ADD KEY `fk_nem_id` (`nem_id`),
  ADD KEY `fk_meret_id` (`meret_id`),
  ADD KEY `fk_akcio_id` (`akcio_id`),
  ADD KEY `fk_exkluziv_id` (`exkluziv_id`),
  ADD KEY `fk_ujdonsag_id` (`ujdonsag_id`);

--
-- Indexes for table `exkluzivok`
--
ALTER TABLE `exkluzivok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kiegeszitok`
--
ALTER TABLE `kiegeszitok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kuponkodok`
--
ALTER TABLE `kuponkodok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kod` (`kod`);

--
-- Indexes for table `lakcimek`
--
ALTER TABLE `lakcimek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `markak`
--
ALTER TABLE `markak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meretek`
--
ALTER TABLE `meretek`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nemek`
--
ALTER TABLE `nemek`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `szallitasi_cim_id` (`szallitasi_cim_id`),
  ADD KEY `szallitas_id` (`szallitas_id`),
  ADD KEY `kuponkod_id` (`kuponkod_id`);

--
-- Indexes for table `rendeles_tetelek`
--
ALTER TABLE `rendeles_tetelek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cipok_id` (`cipok_id`),
  ADD KEY `rendeles_id` (`rendeles_id`);

--
-- Indexes for table `shopping_session`
--
ALTER TABLE `shopping_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cipok_id` (`cipok_id`);

--
-- Indexes for table `szallitasok`
--
ALTER TABLE `szallitasok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ujdonsagok`
--
ALTER TABLE `ujdonsagok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userek`
--
ALTER TABLE `userek`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akciok`
--
ALTER TABLE `akciok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cipok`
--
ALTER TABLE `cipok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `exkluzivok`
--
ALTER TABLE `exkluzivok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kiegeszitok`
--
ALTER TABLE `kiegeszitok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kuponkodok`
--
ALTER TABLE `kuponkodok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lakcimek`
--
ALTER TABLE `lakcimek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `markak`
--
ALTER TABLE `markak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `meretek`
--
ALTER TABLE `meretek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `nemek`
--
ALTER TABLE `nemek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rendelesek`
--
ALTER TABLE `rendelesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rendeles_tetelek`
--
ALTER TABLE `rendeles_tetelek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopping_session`
--
ALTER TABLE `shopping_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `szallitasok`
--
ALTER TABLE `szallitasok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ujdonsagok`
--
ALTER TABLE `ujdonsagok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userek`
--
ALTER TABLE `userek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cipok`
--
ALTER TABLE `cipok`
  ADD CONSTRAINT `fk_akcio_id` FOREIGN KEY (`akcio_id`) REFERENCES `akciok` (`id`),
  ADD CONSTRAINT `fk_exkluziv_id` FOREIGN KEY (`exkluziv_id`) REFERENCES `exkluzivok` (`id`),
  ADD CONSTRAINT `fk_marka_id` FOREIGN KEY (`marka_id`) REFERENCES `markak` (`id`),
  ADD CONSTRAINT `fk_meret_id` FOREIGN KEY (`meret_id`) REFERENCES `meretek` (`id`),
  ADD CONSTRAINT `fk_nem_id` FOREIGN KEY (`nem_id`) REFERENCES `nemek` (`id`),
  ADD CONSTRAINT `fk_ujdonsag_id` FOREIGN KEY (`ujdonsag_id`) REFERENCES `ujdonsagok` (`id`);

--
-- Constraints for table `lakcimek`
--
ALTER TABLE `lakcimek`
  ADD CONSTRAINT `lakcimek_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userek` (`id`);

--
-- Constraints for table `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD CONSTRAINT `rendelesek_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userek` (`id`),
  ADD CONSTRAINT `rendelesek_ibfk_2` FOREIGN KEY (`szallitasi_cim_id`) REFERENCES `lakcimek` (`id`),
  ADD CONSTRAINT `rendelesek_ibfk_3` FOREIGN KEY (`szallitas_id`) REFERENCES `szallitasok` (`id`),
  ADD CONSTRAINT `rendelesek_ibfk_4` FOREIGN KEY (`kuponkod_id`) REFERENCES `kuponkodok` (`id`);

--
-- Constraints for table `rendeles_tetelek`
--
ALTER TABLE `rendeles_tetelek`
  ADD CONSTRAINT `rendeles_tetelek_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userek` (`id`),
  ADD CONSTRAINT `rendeles_tetelek_ibfk_2` FOREIGN KEY (`cipok_id`) REFERENCES `cipok` (`id`),
  ADD CONSTRAINT `rendeles_tetelek_ibfk_3` FOREIGN KEY (`rendeles_id`) REFERENCES `rendelesek` (`id`);

--
-- Constraints for table `shopping_session`
--
ALTER TABLE `shopping_session`
  ADD CONSTRAINT `shopping_session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userek` (`id`),
  ADD CONSTRAINT `shopping_session_ibfk_2` FOREIGN KEY (`cipok_id`) REFERENCES `cipok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
