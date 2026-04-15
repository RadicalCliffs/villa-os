-- VillaOS Database Schema
-- Villa Management Operating System for Phuket, Thailand

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'staff')) DEFAULT 'manager',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Villas table
CREATE TABLE villas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  bedrooms INT NOT NULL DEFAULT 1,
  max_guests INT NOT NULL DEFAULT 2,
  nightly_rate DECIMAL(10,2) NOT NULL,
  owner_id UUID REFERENCES profiles(id),
  manager_id UUID REFERENCES profiles(id),
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('cleaner', 'pool_tech', 'gardener', 'handyman', 'driver')),
  phone TEXT,
  daily_rate_thb DECIMAL(10,2),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reservations table
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  villa_id UUID NOT NULL REFERENCES villas(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('airbnb', 'booking_com', 'direct', 'agoda', 'vrbo')),
  total_revenue DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('confirmed', 'checked_in', 'checked_out', 'cancelled')) DEFAULT 'confirmed',
  commission_rate DECIMAL(5,4) DEFAULT 0.15,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  villa_id UUID NOT NULL REFERENCES villas(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('cleaning', 'pool', 'garden', 'maintenance', 'repair', 'laundry')),
  assigned_to UUID REFERENCES staff(id),
  scheduled_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')) DEFAULT 'pending',
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  villa_id UUID NOT NULL REFERENCES villas(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('maintenance', 'utilities', 'supplies', 'repairs', 'staff', 'other')),
  amount_thb DECIMAL(10,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Owner Reports table
CREATE TABLE owner_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  villa_id UUID NOT NULL REFERENCES villas(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- YYYY-MM format
  total_revenue DECIMAL(10,2) DEFAULT 0,
  total_expenses DECIMAL(10,2) DEFAULT 0,
  net_income DECIMAL(10,2) DEFAULT 0,
  occupancy_rate DECIMAL(5,2) DEFAULT 0,
  nights_booked INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reservations_villa ON reservations(villa_id);
CREATE INDEX idx_reservations_dates ON reservations(check_in, check_out);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_tasks_villa ON tasks(villa_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_date ON tasks(scheduled_date);
CREATE INDEX idx_expenses_villa ON expenses(villa_id);
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_owner_reports_villa_month ON owner_reports(villa_id, month);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE villas ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_reports ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Villas: managers and owners can read all, owners/managers can modify
CREATE POLICY "Villas are viewable by authenticated users" ON villas FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Managers can insert villas" ON villas FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Managers can update villas" ON villas FOR UPDATE USING (auth.role() = 'authenticated');

-- Reservations: authenticated users can CRUD
CREATE POLICY "Reservations viewable by authenticated" ON reservations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Reservations insertable by authenticated" ON reservations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Reservations updatable by authenticated" ON reservations FOR UPDATE USING (auth.role() = 'authenticated');

-- Tasks: authenticated users can CRUD
CREATE POLICY "Tasks viewable by authenticated" ON tasks FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Tasks insertable by authenticated" ON tasks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Tasks updatable by authenticated" ON tasks FOR UPDATE USING (auth.role() = 'authenticated');

-- Staff: viewable by all authenticated
CREATE POLICY "Staff viewable by authenticated" ON staff FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manageable by authenticated" ON staff FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Staff updatable by authenticated" ON staff FOR UPDATE USING (auth.role() = 'authenticated');

-- Expenses: authenticated users can CRUD
CREATE POLICY "Expenses viewable by authenticated" ON expenses FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Expenses insertable by authenticated" ON expenses FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Owner Reports: viewable by authenticated
CREATE POLICY "Reports viewable by authenticated" ON owner_reports FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Reports insertable by authenticated" ON owner_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', COALESCE(NEW.raw_user_meta_data->>'role', 'manager'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
