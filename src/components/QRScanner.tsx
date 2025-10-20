import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScan, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scannerDivRef.current && !scannerRef.current) {
      scannerRef.current = new Html5Qrcode('qr-reader');
    }

    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const startScanning = async () => {
    try {
      setError(null);
      if (!scannerRef.current) return;

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          scannerRef.current?.stop();
          setIsScanning(false);
          onScan(decodedText);
        },
        () => {
        }
      );
      setIsScanning(true);
    } catch (err) {
      setError('Не удалось запустить камеру. Проверьте разрешения.');
      console.error(err);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icon name="QrCode" size={24} className="text-primary" />
            Сканер QR-кодов
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Наведите камеру на QR-код товара
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="space-y-4">
        <div 
          id="qr-reader" 
          ref={scannerDivRef}
          className="w-full rounded-lg overflow-hidden border-2 border-primary/20"
          style={{ minHeight: isScanning ? '300px' : '0' }}
        />

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
            <Icon name="AlertCircle" size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-red-900">Ошибка</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-sm text-blue-900 font-semibold">Сканирование активно...</p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {!isScanning ? (
            <Button className="flex-1" onClick={startScanning}>
              <Icon name="Camera" size={20} className="mr-2" />
              Начать сканирование
            </Button>
          ) : (
            <Button variant="destructive" className="flex-1" onClick={stopScanning}>
              <Icon name="Square" size={20} className="mr-2" />
              Остановить
            </Button>
          )}
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-3">Примеры использования:</p>
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              <Icon name="Package" size={12} className="mr-1" />
              Проверка товара на складе
            </Badge>
            <Badge variant="outline" className="text-xs ml-2">
              <Icon name="Truck" size={12} className="mr-1" />
              Приёмка доставки
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QRScanner;
