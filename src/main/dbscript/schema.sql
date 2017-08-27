--
--    Copyright 2015-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--

drop table if exists `READER_USER`;
drop table if exists `READER_READING_LIST`;
drop table if exists `READER_READING_ITEM`;
drop table if exists `READER_CATALOG`;
drop table if exists `READER_CHANNEL`;
drop table if exists `READER_MESSAGE`;
drop table if exists `READER_EBOOK`;

CREATE TABLE `READER_USER` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `email` varchar(128) NOT NULL,
  `nickname` varchar(64) NOT NULL,
  `password` varchar(32) NOT NULL,
  `portrait` varchar(256) DEFAULT NULL,
  `profile` blob,
  `name` varchar(8) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `id_number` varchar(32) DEFAULT NULL,
  `mobile` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_READING_LIST` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_READING_ITEM` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `book_name` varchar(128) NOT NULL,
  `book_id` char(36) DEFAULT NULL,
  `list_id` char(36) NOT NULL,
  `status` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_CATALOG` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_CHANNEL` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `serial_number` char(36) DEFAULT NULL,
  `url` varchar(256) NOT NULL,
  `amount` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `status` varchar(16) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_MESSAGE` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `serial_number` char(36) DEFAULT NULL,
  `url` varchar(256) NOT NULL,
  `amount` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `status` varchar(16) NOT NULL,
  `category_type` varchar(64) NOT NULL,
  `category_id` char(36) NOT NULL,
  `category_name` varchar(64) NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `pageview` int(11) DEFAULT NULL,
  `comment_count` int(11) DEFAULT NULL,
  `digest` blob DEFAULT NULL,
  `content` mediumblob DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_EBOOK` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `category_type` varchar(64) NOT NULL,
  `category_id` char(36) NOT NULL,
  `format` varchar(16) NOT NULL,
  `name` varchar(64) NOT NULL,
  `path` varchar(256) NOT NULL,
  `downloads` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
