import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface DocumentCameraProps {
  onCapture: (photo: string, type: string) => void;
  onClose: () => void;
  documentType: 'passport' | 'power-of-attorney' | 'other';
}

const DocumentCamera = ({ onCapture, onClose, documentType }: DocumentCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const documentTypes = {
    'passport': { label: 'Паспорт', icon: 'IdCard', color: 'blue' },
    'power-of-attorney': { label: 'Доверенность', icon: 'FileText', color: 'purple' },
    'other': { label: 'Другой документ', icon: 'File', color: 'gray' }
  };

  const currentDoc = documentTypes[documentType];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 1920, height: 1080 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Ошибка доступа к камере:', err);
      alert('Не удалось получить доступ к камере. Используйте загрузку файла.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhoto(photoDataUrl);
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCapturedPhoto(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const retake = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const save = () => {
    if (capturedPhoto) {
      onCapture(capturedPhoto, documentType);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icon name={currentDoc.icon as any} size={24} className="text-primary" />
            Фото: {currentDoc.label}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Сделайте чёткое фото документа
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => { stopCamera(); onClose(); }}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="space-y-4">
        {!capturedPhoto ? (
          <>
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {!isCameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <Icon name="Camera" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Камера не активна</p>
                  </div>
                </div>
              )}
              
              {isCameraActive && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-8 border-2 border-white/50 rounded-lg" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-600">
                      <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                      Съёмка
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {!isCameraActive ? (
                <>
                  <Button className="flex-1" onClick={startCamera}>
                    <Icon name="Camera" size={18} className="mr-2" />
                    Включить камеру
                  </Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Icon name="Upload" size={18} className="mr-2" />
                    Загрузить файл
                  </Button>
                </>
              ) : (
                <>
                  <Button className="flex-1" onClick={capturePhoto}>
                    <Icon name="Circle" size={24} className="mr-2" />
                    Сделать фото
                  </Button>
                  <Button variant="outline" onClick={stopCamera}>
                    <Icon name="X" size={18} className="mr-2" />
                    Отменить
                  </Button>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileUpload}
            />
          </>
        ) : (
          <>
            <div className="rounded-lg overflow-hidden border-2 border-primary/20">
              <img src={capturedPhoto} alt="Captured document" className="w-full" />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={retake}>
                <Icon name="RotateCcw" size={18} className="mr-2" />
                Переснять
              </Button>
              <Button className="flex-1" onClick={save}>
                <Icon name="Check" size={18} className="mr-2" />
                Сохранить фото
              </Button>
            </div>
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-blue-900">Рекомендации</p>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Расположите документ на ровной поверхности</li>
                <li>• Обеспечьте хорошее освещение</li>
                <li>• Все данные должны быть чётко видны</li>
                <li>• Избегайте бликов и теней</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DocumentCamera;
