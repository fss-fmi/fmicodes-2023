CREATE OR REPLACE FUNCTION public.notify_team_added()
RETURNS trigger AS $$
  DECLARE
  BEGIN
    PERFORM pg_notify('team_added', row_to_json(NEW)::text);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER notify_team_added
AFTER INSERT ON public."Team"
FOR EACH ROW
EXECUTE PROCEDURE public.notify_team_added();
