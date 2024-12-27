import React from 'react';
import { SectionGuide } from './SectionGuide';
import { TextArea } from './TextArea';
import type { CreateCharterError } from '../../types';

interface FormSectionProps {
  label: string;
  name: keyof CreateCharterError;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder: string;
  guide: {
    title: string;
    tips: string[];
    example?: string;
  };
}

export const FormSection: React.FC<FormSectionProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  guide
}) => {
  return (
    <div className="space-y-2">
      <TextArea
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
      />
      <SectionGuide
        title={guide.title}
        tips={guide.tips}
        example={guide.example}
      />
    </div>
  );
};