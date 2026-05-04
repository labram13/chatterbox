create table  users (
	user_id serial PRIMARY KEY, 
	username varchar not null,
	email varchar not null, 
	password varchar not null
)

create table refresh_tokens (
	token_id serial primary key,
	user_id int not null,
	token varchar not null,
	issued_at timestamp default current_timestamp,
	foreign key (user_id) references users(user_id) on delete cascade

)

create table direct_message (
	dm_id serial primary key,
	created_at timestamp default current_timestamp
)


create table members (
	user_id int,
	dm_id int,
	joined_at timestamp default current_timestamp,
	primary key(user_id, dm_id),
	
	foreign key (user_id) references users(user_id) on delete cascade,
	foreign key (dm_id) references direct_message(dm_id) on delete cascade

)

insert into direct_message default values


insert into members (user_id, dm_id)
values (33, 1)

insert into members(user_id, dm_id)
values (34, 1)

insert into members (user_id, dm_id)
values (33, 2)

insert into members (user_id, dm_id)
values (35, 2)

-- SQL Command to retrieve dms of user who they are having direct messages with
-- filter rows to find all dms user is part of
-- join with same table members to get all rows that match dm_id which also gets other users
-- join with users table and select columns desired
-- add condition for first members table where user_id matches
-- add condition to filter users table where it's the other user

select m1.dm_id, u.username, u.user_id
from members m1
join members m2
	on m1.dm_id = m2.dm_id
join users u
	on m2.user_id = u.user_id
where m1.user_id = 33
and m2.user_id != 33

alter table direct_message 
add column last_message varchar

update direct_message 
set last_message = 'hello'
where dm_id = 1

update direct_message
set last_message = 'hi'
where dm_id = 2
