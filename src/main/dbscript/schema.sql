#########################################################################
## 数据库 readerdb
#########################################################################
drop database if exists readerdb;
create database readerdb;
use readerdb;

#########################################################################
## 数据库表
#########################################################################
drop table if exists `READER_RESOURCE`;
drop table if exists `READER_OPERATION`;
drop table if exists `READER_ROLE`;
drop table if exists `READER_ROLE_TO_OPERATION`;
drop table if exists `READER_INVITATION`;
drop table if exists `READER_PORTRAIT`;
drop table if exists `READER_USER`;
drop table if exists `READER_USER_TO_ROLE`;

drop table if exists `READER_READING_LIST`;
drop table if exists `READER_READING_ITEM`;
drop table if exists `READER_CATALOG`;
drop table if exists `READER_CHANNEL`;
drop table if exists `READER_MESSAGE`;
drop table if exists `READER_EBOOK`;


CREATE TABLE `READER_RESOURCE` (
  `id` char(36) NOT NULL,
  `parent_id` char(36),
  `name` varchar(64) NOT NULL,
  `description` varchar(512),
  primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_OPERATION` (
  `id` char(36) NOT NULL,
  `resource_id` char(36) NOT NULL,
  `method` varchar(256) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(512),
  primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_ROLE` (
  `id` char(36) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(512),
  primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_ROLE_TO_OPERATION` (
  `role_id` char(36) NOT NULL,
  `operation_id` char(36) NOT NULL,
  primary key (`role_id`, `operation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_INVITATION` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `status` varchar(64) NOT NULL,
  `deleted` char(1) NOT NULL,
  `type` char(1) NOT NULL,
  `addressee` varchar(64) NOT NULL,
  `subject` varchar(128) NOT NULL,
  `content` blob NOT NULL,
  primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_PORTRAIT` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `content` blob NOT NULL,
  primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_USER_TO_ROLE` (
  `user_id` char(36) NOT NULL,
  `role_id` char(36) NOT NULL,
  primary key (`user_id`, `role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_USER` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `status` varchar(64) NOT NULL,
  `deleted` char(1) NOT NULL,
  `email` varchar(128) NOT NULL,
  `nickname` varchar(64) NOT NULL,
  `password` varchar(32) NOT NULL,
  `portrait_id` char(36) DEFAULT NULL,
  `profile` blob,
  `name` varchar(8) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `id_number` varchar(32) DEFAULT NULL,
  `mobile` varchar(16) DEFAULT NULL,
  `qq` varchar(32) DEFAULT NULL,
  `wechat` varchar(32) DEFAULT NULL,
  `microblog` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_READING_LIST` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `status` varchar(64) NOT NULL,
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
  `status` varchar(64) NOT NULL,
  `deleted` char(1) NOT NULL,
  `book_name` varchar(128) NOT NULL,
  `book_id` char(36) DEFAULT NULL,
  `list_id` char(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `READER_CATALOG` (
  `id` char(36) NOT NULL,
  `creator` char(36) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_modifier` char(36) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `status` varchar(64) NOT NULL,
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
  `status` varchar(64) NOT NULL,
  `deleted` char(1) NOT NULL,
  `serial_number` char(36) DEFAULT NULL,
  `url` varchar(256) NOT NULL,
  `amount` int(11) NOT NULL,
  `count` int(11) NOT NULL,
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
  `status` varchar(64) NOT NULL,
  `deleted` char(1) NOT NULL,
  `serial_number` char(36) DEFAULT NULL,
  `url` varchar(256) NOT NULL,
  `amount` int(11) NOT NULL,
  `count` int(11) NOT NULL,
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
  `status` varchar(64) NOT NULL,
  `deleted` char(1) NOT NULL,
  `category_type` varchar(64) NOT NULL,
  `category_id` char(36) NOT NULL,
  `format` varchar(16) NOT NULL,
  `name` varchar(64) NOT NULL,
  `path` varchar(256) NOT NULL,
  `downloads` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
