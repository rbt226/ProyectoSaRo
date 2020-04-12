-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql10.freesqldatabase.com
-- Generation Time: Apr 11, 2020 at 08:56 PM
-- Server version: 5.5.58-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql10332853`
--

-- --------------------------------------------------------

--
-- Table structure for table `Booking`
--

CREATE TABLE `booking` (
  `id_booking` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_room` int(11) NOT NULL,
  `date` date NOT NULL,
  `start` decimal(2,1) NOT NULL,
  `end` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Client`
--

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_client` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `document` int(20) NOT NULL,
  `id_occupation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Configuration`
--

CREATE TABLE `configuration` (
  `id_conf` int(11) NOT NULL,
  `key_conf` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `value_conf` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `active_conf` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Occupation`
--

CREATE TABLE `occupation` (
  `id_occupation` int(11) NOT NULL,
  `type_occupation` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `active_occupation` tinyint(1) NOT NULL DEFAULT '1',
  `image_occupation` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Permission`
--

CREATE TABLE `permission` (
  `id_permission` int(11) NOT NULL,
  `type_permission` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Permission_Role`
--

CREATE TABLE `permission_role` (
  `id_permission_role` int(11) NOT NULL,
  `id_permission` int(11) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `name_role` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Room`
--

CREATE TABLE `room` (
  `id_room` int(11) NOT NULL,
  `name_room` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `active_room` tinyint(1) DEFAULT '1',
  `image_room` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `mail` varchar(100) COLLATE utf8_bin NOT NULL,
  `user_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `mobile_phone` bigint(20) DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `image_user` varchar(300) COLLATE utf8_bin NOT NULL DEFAULT '"link"',
  `active_user` tinyint(1) NOT NULL DEFAULT '1',
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id_booking`),
  ADD KEY `FK_ID_USER` (`id_user`),
  ADD KEY `FK_ID_ROOM` (`id_room`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD UNIQUE KEY `U_IDX_DOCUMENT` (`document`) USING BTREE,
  ADD KEY `FK_ID_USER` (`id_user`),
  ADD KEY `FK_ID_OCCUPATION` (`id_occupation`);

--
-- Indexes for table `Occupation`
--
ALTER TABLE `occupation`
  ADD PRIMARY KEY (`id_occupation`);
  ADD UNIQUE KEY `U_IDX_TYPE` (`type_occupation`) USING BTREE,


--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id_permission`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`id_permission_role`),
  ADD UNIQUE KEY `U_ID_PERMISSION_ROLE` (`id_permission`,`id_role`) USING BTREE,
  ADD KEY `FK_ID_ROLE` (`id_role`),
  ADD KEY `FK_PERMISSION_ID` (`id_permission`) USING BTREE;

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `Room`
--
ALTER TABLE `room`
  ADD UNIQUE KEY `ID_ROOM` (`id_room`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `U_IDX_USER_NAME` (`user_name`) USING BTREE,
  ADD UNIQUE KEY `U_IDX_MAIL` (`mail`) USING BTREE,
  ADD KEY `FK_ID_ROLE` (`id_role`);

  --
-- Indexes for table `configuration`
--
ALTER TABLE `configuration`
  ADD PRIMARY KEY (`id_conf`),
  ADD UNIQUE KEY `U_IDX_KEY` (`key_conf`) USING BTREE;

--
-- AUTO_INCREMENT for table `Booking`
--
ALTER TABLE `booking`
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id_permission` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Room`
--
ALTER TABLE `room`
  MODIFY `id_room` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Configuration`
--
ALTER TABLE `configuration`
  MODIFY `id_conf` int(11) NOT NULL AUTO_INCREMENT;

-- AUTO_INCREMENT for table `Occupation`
--
ALTER TABLE `occupation`
  MODIFY `id_occupation` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for table `Booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `Booking_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `Booking_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id_room`);

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `Client_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `Client_ibfk_2` FOREIGN KEY (`id_occupation`) REFERENCES `occupation` (`id_occupation`);

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `PermissionRol_ibfk_2` FOREIGN KEY (`id_permission`) REFERENCES `permission` (`id_permission`),
  ADD CONSTRAINT `PermissionRol_ibfk_3` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
