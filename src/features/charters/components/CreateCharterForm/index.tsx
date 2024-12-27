import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { FormSection } from './FormSection';
import { FormActions } from './FormActions';
import { UseCaseList } from './UseCaseList';
import { SectionGuide } from './SectionGuide';
import { StakeholderSelection } from '@/features/stakeholders/components/StakeholderSelection';
import { StakeholderGuide } from '@/features/stakeholders/components/StakeholderGuide';
import { StakeholderGuideToggle } from '@/features/stakeholders/components/StakeholderGuideToggle';
import { useCreateCharter } from '../../hooks/useCreateCharter';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import type { CreateCharterData } from '../../types';
import type { StakeholderRole, StakeholderDepartment } from '@/types/database';

interface Stakeholder {
  department: StakeholderDepartment;
  email: string;
  role: StakeholderRole;
}

const initialFormData: CreateCharterData = {
  title: '',
  description: '',
  problem_statement: '',
  target_user: '',
  use_cases: [],
  business_case: '',
  risks: '',
};

export const CreateCharterForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateCharterData>(initialFormData);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const { saveCharter, isLoading, error } = useCreateCharter();
  const [showGuide, setShowGuide] = useLocalStorage('showStakeholderGuide', true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveCharter(formData, stakeholders);
    if (success) {
      setFormData(initialFormData);
      setStakeholders([]);
    }
  };

  const handleSaveDraft = async () => {
    const success = await saveCharter(formData, stakeholders, true);
    if (success) {
      setFormData(initialFormData);
      setStakeholders([]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-neutral-gray-900">
          Title
        </label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={error?.title}
          placeholder="Enter a descriptive title for your charter"
          className="text-lg"
        />
      </div>

      <FormSection
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={error?.description}
        placeholder="Provide a brief overview of this charter"
        guide={{
          title: "Writing an Effective Description",
          tips: [
            "Keep it concise and clear",
            "Focus on the main objective",
            "Highlight key benefits"
          ],
          example: "Implement a sophisticated push notification system to improve user engagement through personalized communications"
        }}
      />

      <FormSection
        label="Problem Statement"
        name="problem_statement"
        value={formData.problem_statement}
        onChange={handleChange}
        error={error?.problem_statement}
        placeholder="What problem does this initiative solve?"
        guide={{
          title: "Defining the Problem",
          tips: [
            "Be specific about the challenge",
            "Include metrics where possible",
            "Explain the impact"
          ],
          example: "Current email-only communication has low open rates (15%) and delayed responses, causing users to miss important updates"
        }}
      />

      <FormSection
        label="Target User"
        name="target_user"
        value={formData.target_user}
        onChange={handleChange}
        error={error?.target_user}
        placeholder="Who is the target user or beneficiary?"
        guide={{
          title: "Identifying Target Users",
          tips: [
            "Define user segments clearly",
            "Consider both primary and secondary users",
            "Include relevant demographics"
          ],
          example: "Mobile app users across all demographics who have opted into notifications"
        }}
      />

      <UseCaseList
        useCases={formData.use_cases}
        onChange={(useCases) => setFormData(prev => ({ ...prev, use_cases: useCases }))}
        error={error?.use_cases}
      />

      <FormSection
        label="Business Value"
        name="business_case"
        value={formData.business_case}
        onChange={handleChange}
        error={error?.business_case}
        placeholder="What is the business value or impact?"
        guide={{
          title: "Building the Business Case",
          tips: [
            "Quantify benefits where possible",
            "Include both direct and indirect value",
            "Consider long-term impact"
          ],
          example: "Projected 40% increase in user engagement and 25% improvement in retention rates"
        }}
      />

      <FormSection
        label="Risks"
        name="risks"
        value={formData.risks}
        onChange={handleChange}
        error={error?.risks}
        placeholder="What are the potential risks and mitigation strategies?"
        guide={{
          title: "Risk Assessment",
          tips: [
            "List key risks and their impact",
            "Include mitigation strategies",
            "Consider technical and business risks"
          ],
          example: "Risk: User notification fatigue → Mitigation: Implement AI-driven frequency capping"
        }}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-gray-900">Stakeholders</h3>
        {showGuide ? (
          <div className="mb-6">
            <StakeholderGuide />
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="text-sm text-primary-ocean-500 hover:text-primary-ocean-600 mt-2"
            >
              Hide guide
            </button>
          </div>
        ) : (
          <StakeholderGuideToggle onShow={() => setShowGuide(true)} />
        )}
        <StakeholderSelection onChange={setStakeholders} />
      </div>

      {error?.general && (
        <p className="text-sm text-secondary-red">{error.general}</p>
      )}

      <FormActions
        onSaveDraft={handleSaveDraft}
        isLoading={isLoading}
      />
    </form>
  );
};