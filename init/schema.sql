-- Tables

create table Professionals (
    prof_id     serial not null unique,
    email       text not null unique,
    full_name   text,
    password    text,
    location    text,
    dob         date,
    profession  text,
    postcode    integer,
    is_subbed   bool,
    primary key (prof_id)    
);

create table SupportUsers (
    user_id     serial not null unique,
    name        text,
    dob         date,
    postcode    integer,
    snapshot    text,
    comm_env    text,
    interests   text,
    primary key (user_id)
);

create table Supports (
    support_id  serial not null unique,
    name        text,
    category    integer,
    prof_id     integer not null references Professionals(prof_id),
    primary key (support_id)
);

create table Images (
    img_id      serial not null unique,
    url         text,
    user_id     integer not null references SupportUsers(user_id),
    primary key (img_id)
);

create table hasClient (
    prof_id     integer not null references Professionals(prof_id),
    user_id     integer not null references SupportUsers(user_id),
    primary key (prof_id,user_id)
);

create table hasSupport (
    support_id  integer not null references Supports(support_id),
    user_id     integer not null references SupportUsers(user_id),
    primary key (support_id,user_id)
);
