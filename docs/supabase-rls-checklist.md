# Supabase RLS Checklist

* profiles: user sees own profile; manager sees assigned officers; admin sees all
* dealers: officer sees assigned dealers only; manager sees territory dealers
* visits: officer sees own; manager sees territory
* location_pings: officer sees own; manager sees assigned officer pings
* proof_photos: officer sees own visit photos; manager sees territory visit photos
* service role key only server-side
* storage bucket policies required
