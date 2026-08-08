export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  user_id?: string;
  slug: string;
  full_name: string;
  father_name?: string;
  gotra: string;
  marwar_location: string;
  current_city: string;
  state: string;
  country?: string;
  occupation: string;
  phone: string;
  email?: string;
  profile_image?: string;
  designation?: string;
  company_name?: string;
  category?: string;
  address?: string;
  bio?: string;
  website?: string;
  social_links?: Record<string, string>;
  status: 'approved' | 'disabled';
  registration_date?: string;
  created_at: string;
  updated_at: string;
}

export interface RegistrationRequest {
  id: string;
  user_id?: string;
  full_name: string;
  father_name: string;
  gotra: string;
  marwar_location: string;
  current_city: string;
  state: string;
  occupation: string;
  phone: string;
  email?: string;
  profile_image?: string;
  registration_data?: Record<string, any>;
  status: RegistrationStatus;
  rejection_reason?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  username: string;
  role: 'admin' | 'super_admin';
  created_at: string;
}

export interface AdminActivityLog {
  id: string;
  admin_id?: string;
  admin_username?: string;
  action: string;
  target_id?: string;
  description: string;
  created_at: string;
}

export interface DashboardStats {
  totalRegistrations: number;
  pendingRequests: number;
  approvedMembers: number;
  rejectedRequests: number;
}
