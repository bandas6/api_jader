-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 23-01-2022 a las 22:18:34
-- Versión del servidor: 8.0.27
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cancha`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador_cancha`
--

DROP TABLE IF EXISTS `administrador_cancha`;
CREATE TABLE IF NOT EXISTS `administrador_cancha` (
  `idAdminCancha` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(20) COLLATE latin1_bin NOT NULL,
  `nombre` varchar(100) COLLATE latin1_bin NOT NULL,
  `email` varchar(100) COLLATE latin1_bin NOT NULL,
  `password` varchar(100) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`idAdminCancha`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancha`
--

DROP TABLE IF EXISTS `cancha`;
CREATE TABLE IF NOT EXISTS `cancha` (
  `idCancha` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE latin1_bin NOT NULL,
  `telefono` varchar(20) COLLATE latin1_bin NOT NULL,
  `correo` varchar(100) COLLATE latin1_bin NOT NULL,
  `direccion` varchar(100) COLLATE latin1_bin NOT NULL,
  `cubierta` int NOT NULL,
  PRIMARY KEY (`idCancha`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancha_administrador`
--

DROP TABLE IF EXISTS `cancha_administrador`;
CREATE TABLE IF NOT EXISTS `cancha_administrador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCancha` int NOT NULL,
  `idAdministradorCancha` int NOT NULL,
  `privilegios` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

DROP TABLE IF EXISTS `reserva`;
CREATE TABLE IF NOT EXISTS `reserva` (
  `idReserva` int NOT NULL AUTO_INCREMENT,
  `idCancha` int NOT NULL,
  `idUsuario` int NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `valor` int NOT NULL,
  PRIMARY KEY (`idReserva`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(13) COLLATE latin1_bin NOT NULL,
  `nombre` varchar(100) COLLATE latin1_bin NOT NULL,
  `telefono` varchar(20) COLLATE latin1_bin NOT NULL,
  `password` varchar(100) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
