drop table if exists users cascade;

create table users (
	user_id serial primary key,
	username varchar not null,
	email varchar(255) not null,
	password varchar not null,
	created_at timestamp default current_timestamp
);

drop table if exists refresh_tokens cascade;

create table refresh_tokens (
	token_id serial primary key, 
	fk_user_id int not null references users (user_id) on delete cascade,
	token varchar not null,
	issued_at timestamp default current_timestamp
);

drop table if exists direct_messages cascade;

create table direct_messages (
	dm_id serial primary key,
	fk_creator int references users (user_id),
	created_at timestamp default current_timestamp
)

drop table if exists members cascade;

create table members ( 
	fk_user int references users (user_id),
	fk_dm int references direct_messages (dm_id),
	joined_at timestamp default current_timestamp,
	
	primary key(fk_user, fk_dm)
)

insert into direct_messages
(fk_creator)
values (1);

insert into direct_messages
(fk_creator)
values (2);

insert into direct_messages
(fk_creator)
values (3);

insert into direct_messages
(fk_creator)
values (4);

insert into members 
(fk_user, fk_dm)
values (2, 1);


insert into members
(fk_user, fk_dm)
values (1, 2)

insert into members
(fk_user, fk_dm)
values (1, 3)

insert into members
(fk_user, fk_dm)
values (1, 4)

create table message ( 
	message_id serial primary key, 
	fk_dm_id int references direct_messages (dm_id),
	context text,
	sender int references users (user_id),
	created_at timestamp default current_timestamp
)

insert into message
(fk_dm, context, sender)
values (3, 'testing message', 3)

insert into message
(fk_dm, context, sender)
values (1, 'testing message', 1)

-- Retrieve all dms you own with members and dm_id

select dm.dm_id, u.user_id, u.username
from direct_messages dm
join members m
on dm.dm_id = m.fk_dm
join users u
on m.fk_user = u.user_id
where dm.fk_creator = 1;

--Retrieve dms you are a member of that have messages
select dm.dm_id, u.user_id, u.username
from members m
join direct_messages dm
	on m.fk_dm = dm.dm_id
join message msg         
	on dm.dm_id = msg.fk_dm
join users u
	on u.user_id = fk_creator
WHERE m.fk_user = 1 and dm.fk_creator != 1
group by dm.dm_id, u.user_id






