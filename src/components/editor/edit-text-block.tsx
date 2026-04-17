'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EditTextBlockProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  description?: string;
}

export function EditTextBlock({
  label,
  value,
  onChange,
  placeholder = '',
  multiline = false,
  description,
}: EditTextBlockProps) {
  if (multiline) {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {description && (
          <p className="text-sm text-slate-500">{description}</p>
        )}
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {description && (
        <p className="text-sm text-slate-500">{description}</p>
      )}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
}