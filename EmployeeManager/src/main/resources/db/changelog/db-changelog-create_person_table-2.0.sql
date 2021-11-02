--liquibase formatted sql

--changeset mario:1

create table person2
(
    id   bigint not null auto_increment,
    first_name varchar(255),
    last_name varchar(255),
    email varchar (255),
    primary key (id)
);