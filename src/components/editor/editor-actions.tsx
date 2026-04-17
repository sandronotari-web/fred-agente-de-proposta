'use client';

import { Button } from '@/components/ui/button';

interface EditorActionsProps {
  onSave: () => void;
  onCancel: () => void;
  onPreview: () => void;
  isLoading?: boolean;
  hasChanges?: boolean;
}

export function EditorActions({
  onSave,
  onCancel,
  onPreview,
  isLoading = false,
  hasChanges = false,
}: EditorActionsProps) {
  return (
    <div className="sticky bottom-0 bg-white border-t border-slate-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {hasChanges && (
          <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded">
            Alterações não salvas
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          variant="outline"
          onClick={onPreview}
          disabled={isLoading}
        >
          Ver Preview
        </Button>
        <Button
          onClick={onSave}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </div>
  );
}