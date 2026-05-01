create table users (
	user_id serial primary key,
	email varchar,
	username varchar,
	password varchar,
	created_at timestamptz default now()
)


create table refresh_tokens (
	token_id serial primary key,
	user_id int not null,
	token varchar not null,
	issued_at timestamp default current_timestamp,
	
	foreign key (user_id) references users(user_id) on delete cascade
)