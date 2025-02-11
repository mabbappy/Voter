-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: election
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate` (
  `canid` int NOT NULL AUTO_INCREMENT,
  `candidate` varchar(100) DEFAULT NULL,
  `party_id` int NOT NULL,
  `constituency_id` int NOT NULL,
  `vote_count` int DEFAULT NULL,
  PRIMARY KEY (`canid`),
  KEY `pid_idx` (`party_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (3,'x',1,2,NULL),(4,'y',2,2,NULL),(5,'z',3,2,NULL),(7,'aaa',4,2,NULL);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `constituency`
--

DROP TABLE IF EXISTS `constituency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `constituency` (
  `constituency_id` int NOT NULL AUTO_INCREMENT,
  `constituency_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`constituency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `constituency`
--

LOCK TABLES `constituency` WRITE;
/*!40000 ALTER TABLE `constituency` DISABLE KEYS */;
INSERT INTO `constituency` VALUES (1,'Shangri-la-Town'),(2,'Northern-Kunlun-Mountain'),(3,'Western-Shangri-la'),(4,'Naboo-Vallery'),(5,'New-Felucia');
/*!40000 ALTER TABLE `constituency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eco`
--

DROP TABLE IF EXISTS `eco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eco` (
  `eco_id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) DEFAULT NULL,
  `hashedPass` longtext,
  `email` varchar(45) DEFAULT NULL,
  `salt` longtext,
  PRIMARY KEY (`eco_id`),
  UNIQUE KEY `UVC_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eco`
--

LOCK TABLES `eco` WRITE;
/*!40000 ALTER TABLE `eco` DISABLE KEYS */;
INSERT INTO `eco` VALUES (5,'ECO','lXVN8+kImAsjeRQjonq/+TaRFpvNhYZcz8SdZ/y9KC6gbBr/WiL6yDjZRmGqt7dH9f9MWBmS8CAlgsmqGFBSgA==','election@shangrila.gov.sr','dc2fc0fda3897c01');
/*!40000 ALTER TABLE `eco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party` (
  `party_id` int NOT NULL AUTO_INCREMENT,
  `party` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`party_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES (1,'Blue Party'),(2,'Red Party'),(3,'Yellow Party'),(4,'Independent');
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `setting_id` int NOT NULL AUTO_INCREMENT,
  `isStartElection` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (5,0);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uvc_code`
--

DROP TABLE IF EXISTS `uvc_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uvc_code` (
  `UVC` varchar(50) NOT NULL,
  `used` int DEFAULT NULL,
  PRIMARY KEY (`UVC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uvc_code`
--

LOCK TABLES `uvc_code` WRITE;
/*!40000 ALTER TABLE `uvc_code` DISABLE KEYS */;
INSERT INTO `uvc_code` VALUES ('2E5BHT5R',0),('2GYDT5D3',0),('2LJFM6PM',0),('2TEHRTHJ',0),('38NWLPY3',0),('5492AC6V',0),('556JTA32',0),('75NKUXAH',0),('7983XU4M',0),('7XUFD78Y',0),('8TEXF2HD',0),('9FCV9RMT',0),('9GTZQNKB',0),('B7DMPWCQ',0),('BBMNS9ZJ',0),('BKMKJN5S',0),('BQCRWTSG',0),('D5BG6FDH',0),('DBAD57ZR',0),('DBP4GQBQ',0),('DHKVCU8T',0),('G994LD9T',0),('HH64FWPE',1),('JA9WCMAS',0),('JF2QD3UF',0),('K3EVS3NM',0),('K96JNSXY',0),('KSM9NB5L',0),('KYMK9PUH',0),('LUFKZAHW',0),('LVTFN8G5',0),('ML5NSKKG',0),('N6HBFD2X',0),('NW9ETHS7',0),('PFXB8QXM',0),('Q452KVQE',0),('RXLNLTA6',0),('TH9A6HUB',0),('TZZZCJV8',0),('U5LGC65X',0),('UMT3RLVS',0),('UNP4A5T7',0),('UVE5M7FR',0),('VFBH8W6W',0),('W44QP7XJ',0),('WL3K3YPT',0),('WPC5GEHA',0),('YADA47RL',0),('Z93G7PN9',0),('ZSRBTK9S',0);
/*!40000 ALTER TABLE `uvc_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote_count`
--

DROP TABLE IF EXISTS `vote_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote_count` (
  `vote_id` int NOT NULL AUTO_INCREMENT,
  `voter_id` int NOT NULL,
  `UVC` varchar(45) DEFAULT NULL,
  `canid` int DEFAULT NULL,
  PRIMARY KEY (`vote_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote_count`
--

LOCK TABLES `vote_count` WRITE;
/*!40000 ALTER TABLE `vote_count` DISABLE KEYS */;
INSERT INTO `vote_count` VALUES (6,5,'BBMNS9ZJ',7);
/*!40000 ALTER TABLE `vote_count` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voter`
--

DROP TABLE IF EXISTS `voter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voter` (
  `voter_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `hashedPass` longtext,
  `UVC` varchar(45) DEFAULT NULL,
  `constituency_id` int DEFAULT NULL,
  `salt` longtext,
  PRIMARY KEY (`voter_id`),
  UNIQUE KEY `UVC_UNIQUE` (`UVC`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voter`
--

LOCK TABLES `voter` WRITE;
/*!40000 ALTER TABLE `voter` DISABLE KEYS */;
INSERT INTO `voter` VALUES (3,'sfsdfsdf','2024-01-11','01X3YLxUfynR9fDGW73mG9hHPb3xRRfU+4N8heypFR+yLf0rX9ECS9WBULcHl7TKZ2aX3QQBnZ5jnh80hnnzHQ==','WPC5GEHA',2,'d253d4d8b00301bf'),(4,'MD RAKIBUL ISLAM','2024-01-18','DqTsdAX80guIZm5D3UfdBBrwisnnNOcoyi40UZ8hZrtvF31lvDFfaEQ6RPrt2yR6x04ySaX3fwRDlSwfMM/LLA==','HH64FWPE',2,'4130089447f9c120'),(5,'Testy Bagel','2024-01-17','lXVN8+kImAsjeRQjonq/+TaRFpvNhYZcz8SdZ/y9KC6gbBr/WiL6yDjZRmGqt7dH9f9MWBmS8CAlgsmqGFBSgA==','BBMNS9ZJ',2,'dc2fc0fda3897c01');
/*!40000 ALTER TABLE `voter` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-07 19:46:57
