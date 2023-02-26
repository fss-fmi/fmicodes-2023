CREATE OR REPLACE FUNCTION public.notify_user_updated()
RETURNS trigger AS $$
  DECLARE
  BEGIN
    PERFORM pg_notify('user_updated', row_to_json(NEW)::text);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER notify_user_updated
AFTER UPDATE ON public."User"
FOR EACH ROW
EXECUTE PROCEDURE public.notify_user_updated();
