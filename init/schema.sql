-- Drop tables if they already exist
drop table if exists "Professionals" cascade;
drop table if exists "SupportUsers" cascade;
drop table if exists "Supports" cascade;
drop table if exists "Images" cascade;
drop table if exists "hasClient" cascade;
drop table if exists "hasSupport" cascade;
drop table if exists "ProfUserImageAccess" cascade;

-- Tables

create table "Professionals" (
    email       text not null unique,
    full_name   text,
    password    text,
    location    text,
    dob         date,
    profession  text,
    postcode    integer,
    is_subbed   bool,
    primary key (email)    
);

create table "SupportUsers" (
    user_id     serial not null unique,
    name        text,
    dob         date,
    postcode    integer,
    snapshot    text,
    comm_env    text,
    interests   text,
    profile_pic text,
    primary key (user_id)
);

create table "Supports" (
    support_id  serial not null unique,
    title       text,
    title_img   text,
    date        date,
    step_img    text[],
    step_names  text[],
    step_times  text[],
    category    text,
    layout      bool,
    prof_id     text not null references "Professionals"(email),
    primary key (support_id)
);

create table "Images" (
    img_id      serial not null unique,
    url         text,
    primary key (img_id)
);

create table "hasClient" (
    prof_id     text not null references "Professionals"(email),
    user_id     integer not null references "SupportUsers"(user_id),
    primary key (prof_id, user_id)
);

create table "hasSupport" (
    support_id  integer not null references "Supports"(support_id),
    user_id     integer not null references "SupportUsers"(user_id),
    primary key (support_id, user_id)
);

-- This table manages images linked to professionals and support users.
create table "ProfUserImageAccess" (
    img_id      integer not null references "Images"(img_id),
    prof_id     text not null references "Professionals"(email),
    user_id     integer not null references "SupportUsers"(user_id),
    primary key (img_id, prof_id, user_id)
);
