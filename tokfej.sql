-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 05. 11:27
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `tokfej`
--
CREATE DATABASE IF NOT EXISTS `tokfej` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tokfej`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cheat`
--

DROP TABLE IF EXISTS `cheat`;
CREATE TABLE IF NOT EXISTS `cheat` (
  `azon` int(11) NOT NULL,
  `idopont` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `azon` (`azon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `cheat`
--

INSERT INTO `cheat` (`azon`, `idopont`) VALUES
(1, '2025-11-05 10:01:02');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `azon` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(255) NOT NULL,
  `pont` int(11) NOT NULL,
  PRIMARY KEY (`azon`),
  UNIQUE KEY `nev` (`nev`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`azon`, `nev`, `pont`) VALUES
(1, 'peti', 7),
(2, 'nimrod', 8),
(3, 'nandor', 0),
(4, 'roland', 0),
(5, 'beni', 0);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cheat`
--
ALTER TABLE `cheat`
  ADD CONSTRAINT `cheat_ibfk_1` FOREIGN KEY (`azon`) REFERENCES `users` (`azon`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
