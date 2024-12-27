import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { StakeholderRole, StakeholderDepartment } from '@/types/database';

interface AddStakeholderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: string, role: StakeholderRole) => void;
  department?: StakeholderDepartment;
}

export const AddStakeholderDialog: React.FC<AddStakeholderDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  department
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StakeholderRole>('contributor');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(email, role);
    setEmail('');
    setRole('contributor');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">
            Add {department} Stakeholder
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as StakeholderRole)}
              className="w-full h-10 px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
            >
              <option value="contributor">Contributor</option>
              <option value="leadership">Leadership</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Stakeholder</Button>
          </div>
        </form>
      </div>
    </div>
  );
};