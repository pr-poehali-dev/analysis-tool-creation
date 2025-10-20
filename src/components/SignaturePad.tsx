import { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  onClose: () => void;
  customerName?: string;
}

const SignaturePad = ({ onSave, onClose, customerName }: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setIsEmpty(false);

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas || isEmpty) return;

    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icon name="Pen" size={24} className="text-primary" />
            Подпись клиента
          </h3>
          {customerName && (
            <p className="text-sm text-muted-foreground mt-1">
              Клиент: {customerName}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-primary/30 rounded-lg bg-white relative">
          <canvas
            ref={canvasRef}
            className="w-full h-64 touch-none cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-muted-foreground text-sm">
                Распишитесь пальцем или стилусом
              </p>
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-yellow-900">Информация</p>
              <p className="text-sm text-yellow-700 mt-1">
                Подпись подтверждает получение товара. Используйте планшет или смартфон.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={clear}
            disabled={isEmpty}
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Очистить
          </Button>
          <Button 
            className="flex-1" 
            onClick={save}
            disabled={isEmpty}
          >
            <Icon name="Check" size={18} className="mr-2" />
            Сохранить подпись
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            📝 Подпись автоматически сохранится в заказе и отправится клиенту на email
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SignaturePad;
