import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ServiceQuantityControl } from "./ServiceQuantityControl";

interface ServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  description: string | null;
  image: string;
  price: number;
  stock: number;
  quantity: number;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
}

export function ServiceDialog({
  isOpen,
  onOpenChange,
  name,
  description,
  image,
  price,
  stock,
  quantity,
  onQuantityChange,
  onIncrement,
  onDecrement,
  onAddToCart,
}: ServiceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
            <p className="text-gray-500">{stock} slots available</p>
          </div>
          <div className="flex justify-between items-center gap-4">
            <ServiceQuantityControl
              quantity={quantity}
              stock={stock}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onChange={onQuantityChange}
            />
            <Button 
              onClick={onAddToCart}
              className="flex-1"
              disabled={stock === 0}
            >
              {stock === 0 ? "No Slots Available" : "Book Service"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}