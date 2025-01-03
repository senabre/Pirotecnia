import React from 'react';
import { Upload, X } from 'lucide-react';
import { uploadProfilePhoto } from '../lib/storage';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
}

export default function ImageUpload({ currentImageUrl, onImageUpload, onImageRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadProfilePhoto(file);
      onImageUpload(url);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Foto de perfil</label>
      <div className="flex items-center space-x-4">
        {currentImageUrl ? (
          <div className="relative">
            <img
              src={currentImageUrl}
              alt="Foto de perfil"
              className="h-20 w-20 rounded-full object-cover"
            />
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="h-20 w-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
        )}
        
        <div>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          <label
            htmlFor="photo-upload"
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
              ${isUploading 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'}`}
          >
            {isUploading ? 'Subiendo...' : 'Subir foto'}
          </label>
        </div>
      </div>
    </div>
  );
}