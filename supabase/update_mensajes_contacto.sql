alter table public.mensajes_contacto
  alter column cancha drop not null;

alter table public.mensajes_contacto
  drop constraint if exists mensajes_contacto_hora_solicitada_check;

alter table public.mensajes_contacto
  add constraint mensajes_contacto_hora_solicitada_check
  check (hora_solicitada ~ '^([1-9]|0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$');
