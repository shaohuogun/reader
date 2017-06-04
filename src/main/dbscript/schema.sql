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

drop table if exists `READER_CHANNEL`;
drop table if exists `READER_MESSAGE`;
drop table if exists `READER_EBOOK`;
drop table if exists `READER_READING_LIST`;
drop table if exists `READER_READING_LIST_ITEM`;
drop table if exists `READER_PUBLISHER`;

CREATE TABLE `READER_CHANNEL` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `picking_status` varchar(16) NOT NULL,
  `picking_batch_no` char(36) NOT NULL,
  `picking_amount` int(11) NOT NULL,
  `picking_count` int(11) NOT NULL,
  `category` varchar(32) NOT NULL,
  `url` varchar(256) NOT NULL,
  `name` varchar(64) NOT NULL,
  `publisher` varchar(64) NOT NULL,
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
  `picking_status` varchar(16) NOT NULL,
  `picking_batch_no` char(36) NOT NULL,
  `picking_amount` int(11) NOT NULL,
  `picking_count` int(11) NOT NULL,
  `channel_id` char(36) NOT NULL,
  `url` varchar(256) NOT NULL,
  `title` varchar(128) NOT NULL,
  `release_date` datetime NOT NULL,
  `pageview` int(11) NOT NULL,
  `comment_count` int(11) NOT NULL,
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
  `channel_id` char(36) NOT NULL,
  `format` varchar(16) NOT NULL,
  `name` varchar(64) NOT NULL,
  `path` varchar(256) NOT NULL,  
  `downloads` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_PUBLISHER` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `name` varchar(64) NOT NULL,
  `nickname` varchar(64) NOT NULL,
  `sex` char(1) NOT NULL,
  `portrait` varchar(256) NOT NULL,
  `profile` blob,
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

CREATE TABLE `READER_READING_LIST_ITEM` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `deleted` char(1) NOT NULL,
  `list_id` char(36) NOT NULL,
  `book_id` char(36) NOT NULL,
  `book_name` varchar(64) NOT NULL,
  `status` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;





