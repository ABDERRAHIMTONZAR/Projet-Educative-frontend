import React, { useState, useRef, useEffect } from 'react';
import { X, UploadCloud, FileText, Loader2 } from 'lucide-react';
import { subjects } from '../../data/mockData';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface NewHomeworkFormProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void> | void;
  isLoading?: boolean;
}

const NewHomeworkForm: React.FC<NewHomeworkFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    dueDate: '',
    description: '',
    semestre: '',
    class: '',
    file: null as File | null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.subject) newErrors.subject = 'Veuillez sélectionner une matière';
    if (!formData.dueDate) newErrors.dueDate = 'Veuillez spécifier une date limite';
    else if (new Date(formData.dueDate) < new Date())
      newErrors.dueDate = 'La date ne peut pas être dans le passé';
    if (!formData.description.trim()) newErrors.description = 'Les consignes sont requises';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        data.append(key, value instanceof File ? value : String(value));
      }
    });
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'envoi :', error);
      setErrors((prev) => ({
        ...prev,
        form: 'Une erreur est survenue. Veuillez réessayer.',
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
    e.target.value = ''; // Reset so user can reselect the same file
  };

  const handleFileSelection = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        file: 'Format non supporté. PDF, DOC, DOCX ou TXT requis.',
      }));
      return;
    }
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        file: 'Fichier trop volumineux (max 10 Mo).',
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, file }));
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.file;
      return updated;
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.file;
      return newErrors;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nouveau devoir</h2>
            <p className="text-sm text-gray-500 mt-1">
              Renseignez les détails du devoir à créer
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.form && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {errors.form}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Titre du devoir"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="ex. Exercices de mathématiques"
              error={errors.title}
              
              fullWidth
            />
            <Select
              label="Matière"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              options={subjects.map((subject) => ({ value: subject, label: subject }))}
              error={errors.subject}
              required
              fullWidth
            />
            <Input
              label="Classe"
              name="class"
              value={formData.class}
              onChange={handleChange}
              placeholder="ex. 3ème B"
              fullWidth
            />
            <Input
              label="Date limite"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              error={errors.dueDate}
              required
              fullWidth
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
           <Input
              label="Semestre"
              name="semestre"
              value={formData.semestre}
              onChange={handleChange}
              placeholder="ex. Exercices de mathématiques"
              error={errors.semestre}
              required
              fullWidth
            />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consignes <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez les consignes du devoir..."
              rows={4}
              required
              className={`w-full px-4 py-3 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.description ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div
            onDragEnter={handleDragEvents}
            onDragOver={handleDragEvents}
            onDragLeave={handleDragEvents}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer p-8 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              hidden
              accept=".pdf,.doc,.docx,.txt"
            />
            {!formData.file ? (
              <>
                <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-500">
                  Cliquez ou glissez-déposez un fichier pour l’ajouter
                </p>
                {errors.file && (
                  <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-green-600" />
                <p className="text-gray-700">{formData.file.name}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="ml-auto p-1 rounded-full hover:bg-gray-200"
                  aria-label="Supprimer le fichier"
                >
                  <X className="h-5 w-5 text-red-600" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  En cours...
                </>
              ) : (
                'Créer le devoir'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewHomeworkForm;
