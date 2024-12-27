// Add department type
export type StakeholderDepartment = 
  | 'Sales' 
  | 'Customer Success' 
  | 'Onboarding' 
  | 'HR Consulting' 
  | 'Legal' 
  | 'Marketing' 
  | 'Design' 
  | 'Engineering' 
  | 'Product';

// Update Stakeholder interface
export interface Stakeholder {
  id: string;
  document_id: string;
  type: string;
  email: string;
  role: StakeholderRole;
  department: StakeholderDepartment;
  created_at: string;
}