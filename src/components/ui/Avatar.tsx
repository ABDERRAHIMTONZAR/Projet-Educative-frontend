import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

export function Avatar({ src, alt = "User avatar", fallback }: AvatarProps) {
  const initials = fallback ? fallback.substring(0, 2).toUpperCase() : "";

  return (
    <div className="relative inline-block">
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
          {initials || <User size={20} />}
        </div>
      )}
    </div>
  );
}