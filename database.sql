CREATE TABLE users(
  id bigserial primary key,
  name varchar(50),
  email varchar(50),
  phone varchar(20),
  password varchar(100),
  created_at timestamp default now(),
  updated_at timestamp default now(),
  CONSTRAINT unique_email unique(email)
);

CREATE TABLE profiles(
  id bigserial primary key,
  name varchar(50),

  phone varchar(20),
  password varchar(100),
  created_at timestamp default now(),
  updated_at timestamp default now(),
  CONSTRAINT unique_email unique(email)
);

create table test (
	id serial not null,
	data jsonb
);

