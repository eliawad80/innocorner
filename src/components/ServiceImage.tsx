import { Dialog } from "@/components/ui/dialog";

interface ServiceImageProps {
  image: string;
  name: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function ServiceImage({ image, name, onClick, children }: ServiceImageProps) {
  return (
    <div 
      className="relative aspect-square cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
        {children}
      </div>
    </div>
  );
}