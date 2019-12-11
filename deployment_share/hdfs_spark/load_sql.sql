CREATE TABLE IF NOT EXISTS `Kindle` (
  `id` varchar(100) DEFAULT NULL,
  `asin` varchar(100) NOT NULL,
  `helpful` varchar(100) DEFAULT NULL,
  `overall` int(11) DEFAULT NULL,
  `reviewText` varchar(1000) DEFAULT NULL,
  `reviewTime` datetime DEFAULT NULL,
  `reviewerID` varchar(100) NOT NULL,
  `reviewerName` varchar(100) DEFAULT NULL,
  `summary` varchar(1000) DEFAULT NULL,
  `unixReviewTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`asin`,`reviewerID`)
);

LOAD DATA LOCAL INFILE 'kindle_reviews.csv' 
INTO TABLE Kindle 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

UPDATE `Kindle` SET `reviewTime`= FROM_UNIXTIME(`unixReviewTime`);

ALTER TABLE `Kindle` DROP `id`;
ALTER TABLE `Kindle` DROP `unixReviewTime`;