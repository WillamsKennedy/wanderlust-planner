
-- Shared itineraries table
CREATE TABLE public.shared_itineraries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  budget NUMERIC NOT NULL,
  budget_label TEXT NOT NULL,
  people INTEGER NOT NULL DEFAULT 1,
  days INTEGER NOT NULL DEFAULT 3,
  group_type TEXT NOT NULL DEFAULT 'solo',
  month INTEGER,
  transport_to_destination TEXT,
  city TEXT NOT NULL,
  city_name TEXT NOT NULL,
  selected_spots JSONB NOT NULL DEFAULT '[]'::jsonb,
  accommodation JSONB,
  local_transport TEXT,
  itinerary_data JSONB,
  map_data JSONB,
  rating_avg NUMERIC DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.shared_itineraries ENABLE ROW LEVEL SECURITY;

-- Everyone can view shared itineraries
CREATE POLICY "Anyone can view shared itineraries" ON public.shared_itineraries FOR SELECT TO authenticated USING (true);
-- Users can create their own
CREATE POLICY "Users can create itineraries" ON public.shared_itineraries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
-- Users can update their own
CREATE POLICY "Users can update own itineraries" ON public.shared_itineraries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
-- Users can delete their own
CREATE POLICY "Users can delete own itineraries" ON public.shared_itineraries FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Likes table
CREATE TABLE public.itinerary_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  itinerary_id UUID REFERENCES public.shared_itineraries(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, itinerary_id)
);

ALTER TABLE public.itinerary_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes" ON public.itinerary_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can like" ON public.itinerary_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.itinerary_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Comments table
CREATE TABLE public.itinerary_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  itinerary_id UUID REFERENCES public.shared_itineraries(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.itinerary_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments" ON public.itinerary_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can comment" ON public.itinerary_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.itinerary_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Saved itineraries
CREATE TABLE public.saved_itineraries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  itinerary_id UUID REFERENCES public.shared_itineraries(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, itinerary_id)
);

ALTER TABLE public.saved_itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saves" ON public.saved_itineraries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can save" ON public.saved_itineraries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave" ON public.saved_itineraries FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Ratings table
CREATE TABLE public.itinerary_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  itinerary_id UUID REFERENCES public.shared_itineraries(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, itinerary_id)
);

ALTER TABLE public.itinerary_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ratings" ON public.itinerary_ratings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can rate" ON public.itinerary_ratings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own rating" ON public.itinerary_ratings FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Profiles table for displaying user info on shared itineraries
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for social features
ALTER PUBLICATION supabase_realtime ADD TABLE public.shared_itineraries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.itinerary_comments;
