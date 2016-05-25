CREATE SCHEMA `lps` DEFAULT CHARSET=utf32;

CREATE TABLE `groupinfo` (
  `GRPOUP_NAME` varchar(45) DEFAULT NULL,
  `GROUP_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

CREATE TABLE `itemgroup` (
  `ITEM_GROUP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `BEACON_ID` varchar(45) DEFAULT NULL,
  `GROUP_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ITEM_GROUP_ID`),
  KEY `BEACON_ID_idx` (`BEACON_ID`),
  KEY `GROUP_ID_idx` (`GROUP_ID`),
  CONSTRAINT `itemgroup_ibfk_1` FOREIGN KEY (`BEACON_ID`) REFERENCES `iteminfo` (`BEACON_ID`),
  CONSTRAINT `itemgroup_ibfk_2` FOREIGN KEY (`GROUP_ID`) REFERENCES `groupinfo` (`GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

CREATE TABLE `iteminfo` (
  `BEACON_ID` varchar(45) NOT NULL,
  `ITEM_NAME` varchar(45) DEFAULT NULL,
  `ITEM_LOSS_TIME` varchar(45) DEFAULT NULL,
  `ITEM_DISTANCE` double DEFAULT NULL,
  `ITEM_ALARM_STATUS` int(11) DEFAULT NULL,
  PRIMARY KEY (`BEACON_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

CREATE TABLE `user` (
  `id` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;