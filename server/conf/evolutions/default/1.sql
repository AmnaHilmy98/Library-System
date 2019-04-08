# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table book (
  id                            bigint auto_increment not null,
  name                          varchar(255),
  category                      varchar(255),
  genre                         varchar(255),
  isbn                          varchar(255),
  author                        varchar(255),
  status                        integer not null,
  pages                         integer not null,
  last_lended                   decimal(38),
  constraint pk_book primary key (id)
);

create table lending (
  id                            bigint auto_increment not null,
  borrow_date                   decimal(38),
  return_date                   decimal(38),
  amount                        decimal(38),
  reader                        varchar(255),
  book_id                       bigint,
  status                        integer not null,
  constraint pk_lending primary key (id)
);

create table reader (
  id                            bigint auto_increment not null,
  name                          varchar(255),
  mobile                        varchar(255),
  email                         varchar(255),
  constraint pk_reader primary key (id)
);


# --- !Downs

drop table if exists book;

drop table if exists lending;

drop table if exists reader;

