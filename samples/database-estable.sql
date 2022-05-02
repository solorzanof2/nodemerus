-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.31 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla nodemerus__dev.pictures
CREATE TABLE IF NOT EXISTS `pictures` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla nodemerus__dev.pictures: 5 rows
/*!40000 ALTER TABLE `pictures` DISABLE KEYS */;
INSERT INTO `pictures` (`id`, `created`, `name`) VALUES
	(1, '2022-04-15 17:18:23', 'The Sunset'),
	(2, '2022-04-15 17:18:41', 'The House'),
	(3, '2022-04-15 17:18:51', 'The Dog'),
	(4, '2022-04-15 17:18:57', 'The Cat'),
	(5, '2022-04-15 17:19:01', 'The Car');
/*!40000 ALTER TABLE `pictures` ENABLE KEYS */;

-- Volcando estructura para tabla nodemerus__dev.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) NOT NULL DEFAULT 'publish',
  `name` varchar(200) NOT NULL DEFAULT '',
  `picture_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `post_name` (`name`) USING BTREE,
  KEY `status_date` (`status`,`created`,`id`) USING BTREE,
  KEY `post_author` (`user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla nodemerus__dev.posts: 10 rows
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `user_id`, `created`, `status`, `name`, `picture_id`) VALUES
	(1, 1, '2022-04-15 17:19:18', 'publish', 'Hello World', 1),
	(2, 1, '2022-04-15 17:19:39', 'publish', 'This is awesome', 2),
	(3, 1, '2022-04-15 17:19:56', 'publish', 'Another One For You', 3),
	(4, 1, '2022-04-15 17:20:09', 'publish', 'The House of the Raising Sun', 1),
	(5, 2, '2022-04-15 17:20:35', 'publish', 'Have you really ever loved a Woman', 1),
	(6, 2, '2022-04-15 17:21:04', 'publish', 'Highway to hell', 2),
	(7, 2, '2022-04-15 17:21:23', 'publish', 'Dust in the wind', 2),
	(8, 2, '2022-04-15 17:21:39', 'publish', 'Billie Jean', 2),
	(9, 2, '2022-04-15 17:22:08', 'publish', 'Thriller', 3),
	(10, 2, '2022-04-15 17:22:27', 'publish', 'Beat It', 6);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Volcando estructura para tabla nodemerus__dev.posts_terms
CREATE TABLE IF NOT EXISTS `posts_terms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `term_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post` (`post_id`),
  KEY `fd_term` (`term_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla nodemerus__dev.posts_terms: 3 rows
/*!40000 ALTER TABLE `posts_terms` DISABLE KEYS */;
INSERT INTO `posts_terms` (`id`, `post_id`, `term_id`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 3, 4);
/*!40000 ALTER TABLE `posts_terms` ENABLE KEYS */;

-- Volcando estructura para tabla nodemerus__dev.terms
CREATE TABLE IF NOT EXISTS `terms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '0',
  `slug` varchar(200) NOT NULL DEFAULT '0',
  `taxonomy` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `slug` (`slug`) USING BTREE,
  KEY `name` (`name`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla nodemerus__dev.terms: 6 rows
/*!40000 ALTER TABLE `terms` DISABLE KEYS */;
INSERT INTO `terms` (`id`, `name`, `slug`, `taxonomy`) VALUES
	(1, 'Songs', 'songs', 'SONGS_OF_YESTERDAY'),
	(2, 'Great', 'great', 'GREATEST'),
	(3, 'Hits', 'hits', 'HITS'),
	(4, 'Pop', 'pop', 'POP'),
	(5, 'Rock', 'rock', 'ROCK'),
	(6, 'Heavy Metal', 'heavy-metal', 'HEAVY_METAL');
/*!40000 ALTER TABLE `terms` ENABLE KEYS */;

-- Volcando estructura para tabla nodemerus__dev.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `state` varchar(16) NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING | ACTIVE | INACTIVE | DELETED',
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `pin` varchar(4) DEFAULT NULL,
  `isManual` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla nodemerus__dev.users: 2 rows
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `email`, `state`, `created`, `updated`, `pin`, `isManual`) VALUES
	(1, 'felixidev', '123456', 'felix@gmail.com', 'ACTIVE', '2022-04-15 17:14:03', '2022-04-15 17:14:05', '1234', 'N'),
	(2, 'johndoe', '123456', 'johndoe@gmail.com', 'ACTIVE', '2022-04-15 17:14:35', '2022-04-15 17:14:36', '1234', 'N'),
	(3, 'janedoe', '123456', 'janedoe@gmail.com', 'ACTIVE', '2022-04-16 14:36:39', '2022-04-16 14:36:40', '1234', 'N'),
	(6, 'kiri', 'the-awesome-password-again-dude', 'kiri@gmail.com', 'PENDING', '2022-04-16 19:17:36', '2022-04-16 19:17:36', '1234', 'Y');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
