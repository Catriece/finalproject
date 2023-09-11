CREATE DATABASE  IF NOT EXISTS `myfamilycircle` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myfamilycircle`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: myfamilycircle
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `challenges`
--

DROP TABLE IF EXISTS `challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `challenge_name` varchar(50) DEFAULT NULL,
  `directions` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenges`
--

LOCK TABLES `challenges` WRITE;
/*!40000 ALTER TABLE `challenges` DISABLE KEYS */;
INSERT INTO `challenges` VALUES (1,'Drawing Blindfolded','They say that there is an artist in every child, and as we grow up, we push the creativity away. Well, this  creativity challenge will surely awaken the Leonardo Da Vinci in you. All you need to do is paint your dreams, only blindfolded! Make this artistic challenge more fun by setting a topic like – draw your favorite fruit or a decent sketch of someone in the family.'),(2,'Build a Cheese Cracker House','You can always test a person’s patience level by asking them to build a cheese cracker house. Make it even more fun by giving out a layout and making it a joint effort. Let your inner architect and designer shine!'),(3,'Mimicry Challenge','How well do you know your family? Challenge Do impressions of each other and the one who does it the best wins. It will be fun to see how well your family members observe your habits.'),(4,'Eat a Sour Lemon With No Expression','Eat sour lemon without making any expression or cringing. The one who does it without a twitch wins.'),(5,'Lights. Camera. Action','Take a funny picture sure to get your family laughing. Post it for all to see and vote! The picture with the most votes in the group wins!'),(6,'Eat a Cake With The Hands Tied Behind Back','Getting messy with cake is always fun with family. For this challenge, gather all your family around a table with a cake for each person. They need to finish up the whole cake with their hands tied behind their back.'),(7,'Try Not To Giggle Challenge','Being reminded of funny stories and not laughing can be tougher than you think. Recount your funniest experiences or show funny cat videos. The challenge for your family members is to not laugh, no matter what. The one who manages to not let out a giggle wins.'),(8,'Karaoke Challenge','Singing along to your favorite songs is always a fun activity for family and friends. To make things crazier, put on songs of a foreign unknown song and watch the fun begin!'),(9,'Cooking Challenge','Conduct a cooking competition with all your family, and judge it amongst yourselves. The one who makes the best dish wins the title of MasterChef Monica.');
/*!40000 ALTER TABLE `challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion`
--

DROP TABLE IF EXISTS `discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(450) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `questions_UNIQUE` (`question`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion`
--

LOCK TABLES `discussion` WRITE;
/*!40000 ALTER TABLE `discussion` DISABLE KEYS */;
INSERT INTO `discussion` VALUES (1,'What are the three most interesting things about you?','2023-07-17 00:00:00','2023-07-23 23:59:59',0),(2,'Name five reasons you’re glad to be alive. Explain one of those reasons','2023-07-24 00:00:00','2023-07-30 23:59:59',0),(3,'If you could have any super power, what would it be and why?','2023-07-31 00:00:00','2023-08-06 23:59:59',0),(4,'If you had a time machine for a day, what would you do with it?','2023-08-07 00:00:00','2023-08-13 23:59:59',0),(5,'What’s your favorite song? Why?','2023-08-14 00:00:00','2023-08-20 23:59:59',0),(6,'What’s your favorite movie? Why?','2023-08-21 00:00:00','2023-08-27 23:59:59',0),(7,'If we could go anywhere you wanted on vacation, where would you choose? Why?','2023-08-28 00:00:00','2023-09-03 23:59:59',0),(8,'If you could have a conversation with anyone in history, who would it be? What would you ask them?','2023-09-04 00:00:00','2023-09-10 23:59:59',0),(9,'What is your earliest memory?','2023-09-11 00:00:00','2023-09-17 23:59:59',0),(10,'What are you most proud of?','2023-09-18 00:00:00','2023-09-24 23:59:59',0),(11,'If you had to choose only three words to describe yourself, what would you say?','2023-09-25 00:00:00','2023-10-01 23:59:59',0),(12,'Is there anything about you that inspires other people in any way?','2023-10-02 00:00:00','2023-10-08 23:59:59',0),(13,'What is your idea of an ideal day?','2023-10-09 00:00:00','2023-10-15 23:59:59',0),(14,'If you could instantly become an expert in something, what would it be?','2023-10-16 00:00:00','2023-10-22 23:59:59',0),(15,'If you were invisible where would you go and what would you do?','2023-10-23 00:00:00','2023-10-29 23:59:59',0),(16,'If you could go back in time and give your younger self advice, what would you tell yourself?','2023-10-30 00:00:00','2023-11-05 23:59:59',0),(17,'If you could go forward in time and give your older self advice, what would you tell yourself?','2023-11-06 00:00:00','2023-11-12 23:59:59',0),(18,'What is a quality you wish you could have more of?','2023-11-13 00:00:00','2023-11-19 23:59:59',0),(19,'What would you like to become better at?','2023-11-20 00:00:00','2023-11-26 23:59:59',0),(20,'What scares you the most and why?','2023-11-27 00:00:00','2023-12-03 23:59:59',0),(21,'What\'s the most embarrassing thing that ever happened to you?','2023-12-04 00:00:00','2023-12-10 23:59:59',0),(22,'What one thing that you did in the past would you like to change if you could have a do-over?','2023-12-11 00:00:00','2023-12-17 23:59:59',0),(23,'What makes you feel better when you\'re upset?','2023-12-18 00:00:00','2023-12-24 23:59:59',0),(24,'What do you worry about the most?','2023-12-25 00:00:00','2023-12-31 23:59:59',0),(25,'What things are you not great at yet that you want some day to be good at? How much do you think you would have to practice to get good at those things?','2024-01-01 00:00:00','2024-01-07 23:59:59',0),(26,'What is your biggest goal this year?','2024-01-08 00:00:00','2024-01-14 23:59:59',0),(27,'What is your favorite thing about our family relationship?','2024-01-15 00:00:00','2024-01-21 23:59:59',0),(28,'What is your least favorite thing about our family relationship?','2024-01-22 00:00:00','2024-01-28 23:59:59',0),(29,'Do you feel like you could talk with anyone in our family about anything at all?','2024-01-29 00:00:00','2024-02-04 23:59:59',0),(30,'If we had a special day together as a family what would you want to do?','2024-02-05 00:00:00','2024-02-11 23:59:59',0),(31,'What are the most important things someone in this family has taught you?','2024-02-12 00:00:00','2024-02-18 23:59:59',0),(32,'What three words do you think best describe our family?','2024-02-19 00:00:00','2024-02-25 23:59:59',0),(33,'What is your favorite family tradition?','2024-02-26 00:00:00','2024-03-03 23:59:59',0),(34,'How do you think your friends\' families compare to ours? Are they about as close? Closer? More distant? Why do you think that?','2024-03-04 00:00:00','2024-03-10 23:59:59',0),(35,'What do you think makes a family close?','2024-03-11 00:00:00','2024-03-17 23:59:59',0),(36,'On a scale of 1 to 10, how strict are the parents in our family? What is the ideal number?','2024-03-18 00:00:00','2024-03-24 23:59:59',0),(37,'What’s the best thing about our family?','2024-03-25 00:00:00','2024-03-31 23:59:59',0),(38,'What are the most important things your parents have taught you?','2024-04-01 00:00:00',NULL,0),(39,'What do you think are the most important qualities of a good parent? Why do you think so?',NULL,NULL,0),(40,'Tell each person in the family why you’re glad they’re part of the family.',NULL,NULL,0),(41,'How do you think our family is the same or different from other families?',NULL,NULL,0),(42,'What are the good things about having siblings? What are the bad things?',NULL,NULL,0),(43,'What is the most important thing to do to have a good relationship with a sibling?',NULL,NULL,0),(44,'Do you have better or worse relationships with your sibling(s) than your friends? If worse, why do you think so?',NULL,NULL,0),(45,'Do you think you will be close to your siblings as you get older?',NULL,NULL,0),(46,'Would you rather time-travel into the past to meet your ancestors or into the future to meet your descendants?',NULL,NULL,0),(47,'When your descendants look back, what do you want them to say about you?',NULL,NULL,0),(48,'How are you like each of your parents? How are you different?',NULL,NULL,0),(49,'What traits do you most admire in other people?',NULL,NULL,0),(50,'Did you have a chance to be kind to anyone today?',NULL,NULL,0),(51,'Was anyone kind to you today?',NULL,NULL,0),(52,'Is it ever okay to treat people worse because they look different than you do?',NULL,NULL,0),(53,'Do you think it\'s okay to lie about your age to get into an Amusement Park with a cheaper ticket? Is it ever ok to lie?',NULL,NULL,0),(54,'Does it matter if a person makes a moral or immoral choice, if no one ever knows?',NULL,NULL,0),(55,'Is it ever ok to cheat, in academics, sports, business?',NULL,NULL,0),(56,'What do you think the word \"respect\" means? Do certain people in positions of authority, like parents and teachers, automatically deserve respect? How does someone earn respect? How do people learn respect?',NULL,NULL,0),(57,'Do you think it is ever okay to share a secret that you were told in confidence? When and why?',NULL,NULL,0),(58,'Everybody makes poor choices sometimes. Do you remember a time when you made a choice you later regretted? Did some part of you know that was a bad idea? What kept you from listening to that part of you? How could you support yourself to make a different choice if something similar happened again?',NULL,NULL,0),(59,'What do you think the biggest problem in the world is?',NULL,NULL,0),(60,'Is being a millionaire a worthwhile goal?',NULL,NULL,0),(61,'How important is money? Do you think there is enough money in the world for everyone to have enough?',NULL,NULL,0),(62,'What do you think about taxes? Is it a good idea that everyone chips in to pay for schools and libraries and parks and roads?',NULL,NULL,0),(63,'Are there any lessons that we can learn from history that you think are super-important?',NULL,NULL,0),(64,'How would you change the world if you could?',NULL,NULL,0),(65,'Do you think you can learn anything, with enough practice?',NULL,NULL,0),(66,'Did anything make you think hard today?',NULL,NULL,0),(67,'Do you think there is a difference between being smart and being wise?',NULL,NULL,0),(68,'What is the most embarrassing thing that ever happened to you at school?',NULL,NULL,0),(69,'When you feel a strong emotion, what is the best way to respond to it?',NULL,NULL,0),(70,'Do you feel you\'ve been allowed to experience strong emotions in this family?',NULL,NULL,0),(71,'How have we handle big emotions in this family? ',NULL,NULL,0),(72,'Are you a \"cup is half full\" or \"cup is half empty\" kind of person?',NULL,NULL,0),(73,'What do you do to cheer yourself up when you feel down?',NULL,NULL,0),(74,'What hurts your feelings? How do you act when your feelings are hurt?',NULL,NULL,0),(75,'When you get really upset, how do you help yourself calm down?',NULL,NULL,0),(76,'When you make a mistake, are you able to repair things so that you end up feeling ok? What is the hardest part of repairing things?',NULL,NULL,0),(77,'When you\'ve made the mistake, how do you feel when you apologize, before, during and after?',NULL,NULL,0),(78,'Have you ever apologized for something you didn\'t do to calm a situation?',NULL,NULL,0),(79,'What are the different kinds of courage? How do you define bravery? ',NULL,NULL,0),(80,'What do you do when you feel so frustrated or hopeless that you want to give up?',NULL,NULL,0),(81,'When you wake up in a bad mood, what strategies do you use to help yourself feel better so you can have a good day?',NULL,NULL,0),(82,'Have you ever wished you were dead? When did this take place and what brought you there? ',NULL,NULL,0),(83,'Do you think you are addicted to your phone?',NULL,NULL,0),(84,'What traits do you look for in friends?',NULL,NULL,0),(85,'Do you have friends who are different races or religions than you? Does that have any effect on the friendship? ',NULL,NULL,0),(86,'How do you work things out with a friend when you have a disagreement? Do you think that is a healthy approach?',NULL,NULL,0),(87,'On a scale of 1-10, where do you consider yourself on the shy to outgoing continuum?',NULL,NULL,0),(88,'What do you think leadership is? What makes a good leader?',NULL,NULL,0),(89,'What is your favorite social media? What do you like about it? Do you think it has any downsides?',NULL,NULL,0),(90,'How should you decide who to marry?',NULL,NULL,0),(91,'Is the phrase \"fall in love\" realistic?',NULL,NULL,0),(92,'How do you think love is different in real life than it is in the movies?',NULL,NULL,0),(93,'What would be most important thing to you in looking for a romantic partner? What about in looking for a spouse?',NULL,NULL,0),(94,'Why do you think people get divorced? How do you think it affects their kids?',NULL,NULL,0),(95,'If a guy is attracted to a girl, what do you think is the best way for him to show it? ',NULL,NULL,0),(96,'If a girl is attracted to a guy, what do you think is the best way for her to show it? ',NULL,NULL,0),(97,'What matters most, attractiveness or being strong, smart, brave, responsible, caring, etc?',NULL,NULL,0),(98,'Who decides whether someone is pretty or attractive?',NULL,NULL,0),(99,'How do you think the bodies of models and actors on TV compare to ordinary peoples’ bodies? How does it make you feel to watch them?',NULL,NULL,0),(100,'What do you think of the way girls and guys in middle and high school dress these days?',NULL,NULL,0),(101,'Do you think girls look better with or without makeup?',NULL,NULL,0),(102,'Is attractiveness innate or is it something we can make ourselves into?',NULL,NULL,0),(103,'Does making ourselves attractive have a cost? (for instance, comfort, adventure, or fun.) Is that different for girls than for boys?',NULL,NULL,0),(104,'What\'s the hardest thing about being a girl?',NULL,NULL,0),(105,'What\'s the hardest thing about being a boy?',NULL,NULL,0),(106,'What did you do today to take care of your body?',NULL,NULL,0),(107,'Do you believe in God? Why or why not? If so, how do you picture God?',NULL,NULL,0),(108,'Do you ever talk to God?',NULL,NULL,0),(109,'Is spirituality the same as religion or different?',NULL,NULL,0),(110,'What do you think happens after death?',NULL,NULL,0),(111,'What do you think is the meaning of life? Why are we alive?',NULL,NULL,0);
/*!40000 ALTER TABLE `discussion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_comments`
--

DROP TABLE IF EXISTS `discussion_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `discussion_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `timestamp` datetime NOT NULL,
  `comment` varchar(500) NOT NULL,
  `family_code` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_comments`
--

LOCK TABLES `discussion_comments` WRITE;
/*!40000 ALTER TABLE `discussion_comments` DISABLE KEYS */;
INSERT INTO `discussion_comments` VALUES (1,4,4,'','2023-08-07 12:15:57','Yeah.. I miss them too. This would be a great way to use the time machine. We could maybe even bring them to the future to meet their grandchildren and new nieces and nephews? I think that\'d be way cool.','RQSWN5');
/*!40000 ALTER TABLE `discussion_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_responses`
--

DROP TABLE IF EXISTS `discussion_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion_responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discussion_post_id` int NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `name` varchar(100) NOT NULL,
  `response` varchar(2000) NOT NULL,
  `timestamp` varchar(45) NOT NULL,
  `family_code` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_responses`
--

LOCK TABLES `discussion_responses` WRITE;
/*!40000 ALTER TABLE `discussion_responses` DISABLE KEYS */;
INSERT INTO `discussion_responses` VALUES (1,4,'6','Elaine Renee Morgan','I would go back in time to visit my mom and brother. My mother has been dead for 7 years now and my brother going on 4. I miss them so much and it has been weird doing life without them present.','2023-08-09 11:46:33','RQSWN5'),(2,4,'21','Greg Lee Gilbert','If I had a time machine for a day, I would go and check the stock prices.','2023-08-09 12:45:45','RQSWN5'),(3,4,'18','Jody  Gilbert','If I had a time machine, I would go back in time to look at the dinosaurs.','2023-08-10 05:01:52','RQSWN5'),(4,5,'6','Elaine Renee Morgan','I like to move it move it because it\'s fun!','2023-08-14 10:02:10','RQSWN5'),(5,6,'6','Elaine Renee Morgan','The kid in me is absolutely loving Cars right now! It is a beautiful story of redemption! #Ka-Chow','2023-08-24 18:22:13','RQSWN5'),(6,6,'22','Henry Jon Gilbert','I absolutely am a marvel fan hands down! Not sure which one I like the best! They may not have the strongest superheroes like DC but that\'s what makes them more relatable! ','2023-08-24 18:33:00','RQSWN5'),(7,7,'6','Elaine Renee Morgan','I would choose to go to Hawaii, because a lot of my family are still on the island and I miss them!','2023-08-28 10:33:21','RQSWN5'),(8,7,'22','Henry Jon Gilbert','The mountains!','2023-08-28 12:02:29','RQSWN5');
/*!40000 ALTER TABLE `discussion_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_codes`
--

DROP TABLE IF EXISTS `family_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creator_id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `circle_name` varchar(30) NOT NULL,
  `circle_code` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `circle_code_UNIQUE` (`circle_code`),
  KEY `admin_family_code` (`creator_id`),
  CONSTRAINT `admin_family_code` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_codes`
--

LOCK TABLES `family_codes` WRITE;
/*!40000 ALTER TABLE `family_codes` DISABLE KEYS */;
INSERT INTO `family_codes` VALUES (1,4,'ohsnapitzcat','TheGilberts','RQSWN5'),(2,17,'EverGirl','Evergreens','GJUOZ8'),(3,8,'CaliB23','COUSINSGANG','PBI28F'),(4,1,'heythere','HanseaClan','D7QX9X'),(5,7,'Madsria','SierraCrew','CM236T'),(6,25,'catriece','GilbertClan','5DHBJ7');
/*!40000 ALTER TABLE `family_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_relationships`
--

DROP TABLE IF EXISTS `family_relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_relationships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `family_id` int NOT NULL,
  `circle_creator` varchar(45) NOT NULL,
  `relationship` varchar(45) NOT NULL,
  `family_code` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `family_relationships_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_relationships`
--

LOCK TABLES `family_relationships` WRITE;
/*!40000 ALTER TABLE `family_relationships` DISABLE KEYS */;
INSERT INTO `family_relationships` VALUES (2,15,'Testing3',4,'ohsnapitzcat','Child','RQSWN5'),(3,6,'Erms',4,'ohsnapitzcat','Sister','RQSWN5'),(4,18,'TestFromClient',4,'ohsnapitzcat','Sibling','RQSWN5'),(5,19,'AnotherTest',17,'EverGirl','Sister','GJUOZ8'),(6,11,'jagboy35',17,'EverGirl','Brother','GJUOZ8'),(7,12,'Elileboy35',17,'EverGirl','Father','GJUOZ8'),(10,14,'Testing2',17,'EverGirl','Mother','GJUOZ8'),(11,8,'CaliB23',8,'CaliB23','Owner','PBI28F'),(12,9,'CalebB23',8,'CaliB23','Cousin','PBI28F'),(13,1,'heythere',1,'heythere','Owner','D7QX9X'),(14,7,'Madsria',7,'Madsria','Owner','CM236T'),(16,17,'EverGirl',17,'EverGirl','Owner','GJUOZ8'),(17,13,'Testing1',7,'Madsria','Owner','CM236T'),(18,2,'heyt',1,'heythere','Spouse','D7QX9X'),(19,3,'test2',1,'heythere','Son','D7QX9X'),(20,10,'TestKen',1,'heythere','Daughter','D7QX9X'),(21,4,'ohsnapitzcat',4,'ohsnapitzcat','Owner','RQSWN5'),(22,20,'JAGGirl5',4,'ohsnapitzcat','Aunt','RQSWN5'),(23,21,'GLee52',4,'ohsnapitzcat','Uncle','RQSWN5'),(24,22,'HenJon',4,'ohsnapitzcat','Uncle','RQSWN5'),(25,25,'catriece',25,'catrieceg','Owner','5DHBJ7');
/*!40000 ALTER TABLE `family_relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memories_comments`
--

DROP TABLE IF EXISTS `memories_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memories_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `milestones_id` int NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `milestones_id_UNIQUE` (`milestones_id`),
  KEY `memories_comments_ibfk_1` (`user_id`),
  CONSTRAINT `memories_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `memories_comments_ibfk_2` FOREIGN KEY (`milestones_id`) REFERENCES `memories_milestones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memories_comments`
--

LOCK TABLES `memories_comments` WRITE;
/*!40000 ALTER TABLE `memories_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `memories_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memories_milestones`
--

DROP TABLE IF EXISTS `memories_milestones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memories_milestones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `caption` varchar(250) DEFAULT NULL,
  `timestamp` timestamp NOT NULL,
  `url_1` varchar(300) DEFAULT NULL,
  `url_2` varchar(300) DEFAULT NULL,
  `url_3` varchar(300) DEFAULT NULL,
  `url_4` varchar(300) DEFAULT NULL,
  `url_5` varchar(300) DEFAULT NULL,
  `url_6` varchar(300) DEFAULT NULL,
  `url_7` varchar(300) DEFAULT NULL,
  `url_8` varchar(300) DEFAULT NULL,
  `url_9` varchar(300) DEFAULT NULL,
  `url_10` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `memories_milestones_ibfk_1` (`user_id`),
  CONSTRAINT `memories_milestones_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memories_milestones`
--

LOCK TABLES `memories_milestones` WRITE;
/*!40000 ALTER TABLE `memories_milestones` DISABLE KEYS */;
/*!40000 ALTER TABLE `memories_milestones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `message_content` varchar(3000) DEFAULT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_comments`
--

DROP TABLE IF EXISTS `post_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `comment` varchar(1000) NOT NULL,
  `timestamp` timestamp NOT NULL,
  `family_code` varchar(6) NOT NULL,
  `media_url` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post_comments_ibfk_1` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_comments`
--

LOCK TABLES `post_comments` WRITE;
/*!40000 ALTER TABLE `post_comments` DISABLE KEYS */;
INSERT INTO `post_comments` VALUES (1,4,2,1,'I\'m so glad you like it! Can\'t wait to get the whole fam involved! :D','2023-08-02 06:44:00','RQSWN5',''),(2,6,2,1,'Dad on social media will be the funnies thing! HA!','2023-08-02 06:47:57','RQSWN5',''),(3,4,2,1,'Oh gosh, think mom would be worse HAHA','2023-08-02 06:49:49','RQSWN5','');
/*!40000 ALTER TABLE `post_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `entry` varchar(2200) NOT NULL,
  `timestamp` timestamp NOT NULL,
  `family_code` varchar(6) NOT NULL,
  `media_url` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_ibfk_1` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,4,'I was able to update my initial post!','2023-08-02 06:06:15','RQSWN5',''),(2,6,'I LOVE LOVE THIS NEW APP! THANKS SIS FOR INVITING ME!','2023-08-02 05:49:41','RQSWN5',''),(3,6,'This project is tedious and hard work but I am so glad to be getting through it!','2023-08-10 07:27:37','RQSWN5',NULL),(4,18,'Figuring out this app is pretty neat! Thanks for the rec, Catriece!','2023-08-10 09:02:35','RQSWN5',NULL),(8,6,'I was able to show my dad and sister everything I\'ve been working on! It was good for me for them to see all the progress I\'ve made!','2023-08-15 01:51:08','RQSWN5',NULL),(10,22,'I love nature photography. It is always a pleasure to capture God\'s beautiful creation with film! I can\'t wait for this to be my day job and no longer a hobby!','2023-08-24 22:31:39','RQSWN5',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `family_code` varchar(6) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `biography` varchar(250) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `salt` varchar(300) DEFAULT NULL,
  `profile_picture` varchar(300) DEFAULT NULL,
  `cover_photo` varchar(300) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Catriece',NULL,'Hansea','D7QX9X','heythere','c@email.com','Testing adding a biography to Catriece\'s account','admin','$2b$10$vxR38BalXOVLAiew6K7cFO1VEs0CzkiWzywViMbESZzNOsChsdRmm','$2b$10$vxR38BalXOVLAiew6K7cFO','http://dummyimage.com/146x100/dddddd/000000.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(2,'Joseph',NULL,'Hansea','D7QX9X','heyt','cfg@email.com',NULL,'admin','booboothafoo',NULL,'http://dummyimage.com/115x100/cc0000/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(3,'Essy','','Tess','D7QX9X','test2','EssT@email.com',NULL,'member','WOWOWe',NULL,'http://dummyimage.com/120x100/cc0000/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(4,'Catriece','Chantel','Gilbert','RQSWN5','ohsnapitzcat','cat@email.com',NULL,NULL,'$2b$10$Zo6y1JIWsPi2MkL/8HNho.iS8LR1gInntom589NrsdmTWiIcRrVUW','$2b$10$Zo6y1JIWsPi2MkL/8HNho.','https://fastly.picsum.photos/id/633/1818/1228.jpg?hmac=dyjPGybYgWgnTXC3lPjV-rap_PQUlnC0O6vCkhP_-HE','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(6,'Elaine','Renee','Morgan','RQSWN5','Erms','erms@email.com','Jesus is King | Wifey to One | Mommy of 2 | 27 | Web Developer | ',NULL,'$2b$10$KJR9tW8LdYijNTKi1Hgpge.sYgpqx6e.dY0QpC4pm4cXp9dkRVYeS','$2b$10$KJR9tW8LdYijNTKi1Hgpge','https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(7,'Madi','','Sierra','CM236T','Madsria','ms@email.com',NULL,NULL,'$2b$10$Itmaym0vfRYre2Nu/ymGq.UKVWUFW.HDdYAh3SohKjz1PeeOn/sfi','$2b$10$Itmaym0vfRYre2Nu/ymGq.','http://dummyimage.com/125x100/5fa2dd/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(8,'Cali','','Baker','PBI28F','CaliB23','calib23@email.com',NULL,NULL,'$2b$10$tTN.EHtcu6BW24xArGAxc.BGS1h1mmgt9iBqnwBX.drZ2MIyC.9A2','$2b$10$tTN.EHtcu6BW24xArGAxc.','http://dummyimage.com/130x100/5fa2dd/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(9,'Caleb','','Baker','PBI28F','CalebB23','caleb23@email.com',NULL,NULL,'$2b$10$ixrhcoO/1maG5mBbRt9K8O35Y0sbDYbKz8B1XfhHdzRzYKHmi9Pee','$2b$10$ixrhcoO/1maG5mBbRt9K8O','https://fastly.picsum.photos/id/375/5000/3333.jpg?hmac=L53fYFkx5YL5XoVDnKZPiA7_jyVEMegb-BXhxDm4tuM','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(10,'Test','','Kennedy','D7QX9X','TestKen','testingken@email.com',NULL,NULL,'$2b$10$8V1M0CTL7BiiA08ASVSP4e1d9QSZx3FbthUdQYSuqz/kRJqNyghNW','$2b$10$8V1M0CTL7BiiA08ASVSP4e','http://dummyimage.com/158x100/cc0000/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(11,'Joey','Ant','Gilbert','GJUOZ8','jagboy35','jag@email.com',NULL,NULL,'$2b$10$Sbc/OpG6S.Ql8g7Htj/S0ed0WcHxSA4mtXCbHOvb8eelss2nYSOOu','$2b$10$Sbc/OpG6S.Ql8g7Htj/S0e','http://dummyimage.com/201x100/5fa2dd/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(12,'Eli','Le','Gilbert','GJUOZ8','Elileboy35','eli@email.com',NULL,NULL,'$2b$10$DgGtEDhUVQTOSgybXuEOGuqutRXD3/VzUi4U33LwDlJeB07ec3Tgy','$2b$10$DgGtEDhUVQTOSgybXuEOGu','http://dummyimage.com/196x100/5fa2dd/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(13,'Test','ing','1','CM236T','Testing1','T1@email.com',NULL,NULL,'$2b$10$oa.OP9/cMh7iJmtshq.BiudG1Xlwh0vU44KabzFNGHZQE9zZ6ciIm','$2b$10$oa.OP9/cMh7iJmtshq.Biu','http://dummyimage.com/189x100/cc0000/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(14,'Test','ing','2','GJUOZ8','Testing2','T2@email.com',NULL,NULL,'$2b$10$izwSmO8dL/8BNFYrODGsF.fYcSokTWt5.reYM5fdkuO6oLy6ADERu','$2b$10$izwSmO8dL/8BNFYrODGsF.','http://dummyimage.com/219x100/ff4444/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(15,'Test','ing','3','RQSWN5','Testing3','T3@email.com','Test bio!',NULL,'$2b$10$H1BX70rTIIzPNE8qnf5O6OOXNFcrTL7lQZJvFjkzFs2CDGVZg83Yu','$2b$10$H1BX70rTIIzPNE8qnf5O6O','https://fastly.picsum.photos/id/334/2304/1536.jpg?hmac=ihrh84KbSSW-zvp-oRz8FGCVOWvPAD3SZvYPS0v3mv8','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(17,'Allie','','Evergreen','GJUOZ8','EverGirl','allE@email.com',NULL,NULL,'$2b$10$13xNlOpPqXcspqYOIez8/OiQDha5SYFTW3FOk7lRnPeAPNSZG7BI6','$2b$10$13xNlOpPqXcspqYOIez8/O','http://dummyimage.com/123x100/dddddd/000000.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(18,'Jody','','Gilbert','RQSWN5','TestFromClient','clientt@email.com','Test bio!',NULL,'$2b$10$FDo0ukQG.y8qXtgOL0kMq.DJeCBVuVVPXAfU3U5CwhTZG51GuM1.K','$2b$10$FDo0ukQG.y8qXtgOL0kMq.','https://fastly.picsum.photos/id/822/5000/3333.jpg?hmac=mRS2KWKQuY-IqSKoTt435BVvEA0hTzwSAsxtMvm86ao','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(19,'Cat','Gat','Evergreen','GJUOZ8','JoGilly23','cge@email.com',NULL,NULL,'$2b$10$Ozt4EXKbpC6DefwbDi6N2eDMp0XZFKfJjBeqTEDx5SoT6z2ZdHaMa','$2b$10$Ozt4EXKbpC6DefwbDi6N2e','http://dummyimage.com/212x100/5fa2dd/ffffff.png','http://dummyimage.com/163x100/5fa2dd/ffffff.png',NULL),(20,'Jeanie','Ann','Gilbert','RQSWN5','JAGGirl5','jag5@email.com','Test bio!',NULL,'$2b$10$jlFwpjuMRuCVUtvi1nsP/.d3frQxImy4z.pXT/427YPTbbK1aEEVa','$2b$10$jlFwpjuMRuCVUtvi1nsP/.','https://fastly.picsum.photos/id/660/2508/1672.jpg?hmac=D_MkrRyzUZRYLOGoa4HJ1WJTfnzN0qshbCEPpaCoSuI',NULL,NULL),(21,'Greg','Lee','Gilbert','RQSWN5','GLee52','glg5@email.com','Test bio!',NULL,'$2b$10$eYnBzK.olI0qlQ5O4bTMU.hTaYTSyeQ9qn0D/yI5vZaeAOOz.W57S','$2b$10$eYnBzK.olI0qlQ5O4bTMU.','https://fastly.picsum.photos/id/433/4752/3168.jpg?hmac=Og-twcmaH_j-JNExl5FsJk1pFA7o3-F0qeOblQiJm4s',NULL,NULL),(22,'Henry','Jon','Gilbert','RQSWN5','HenJon','hj@email.com',NULL,NULL,'$2b$10$4c3cYozrBj2GCvkWpYlsQ./DDCpNQ42gI2efylmM20Om/vLDqZKOO','$2b$10$4c3cYozrBj2GCvkWpYlsQ.','https://fastly.picsum.photos/id/91/3504/2336.jpg?hmac=tK6z7RReLgUlCuf4flDKeg57o6CUAbgklgLsGL0UowU',NULL,NULL),(25,'Catriece','Chantel','Gilbert','5DHBJ7','catriece','catrieceg@email.com',NULL,NULL,'$2b$10$TrfesHluFRjT3F48t0qSq.rYRyCHfZIb3ZFdvJRtlWnOPCLbP8lNC','$2b$10$TrfesHluFRjT3F48t0qSq.',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-11 14:04:32
