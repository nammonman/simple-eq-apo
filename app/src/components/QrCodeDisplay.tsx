import React from 'react';
import QRCode from 'react-qr-code';

const QrCodeDisplay = ({ value }: { value: string }) => {
  return (
    <div className="flex flex-col items-center">
      <QRCode value={"simple-eq-apo.vercel.app/mobile?pairId="+value} size={256} />
      <p className="mt-4 text-lg font-mono mb-4 lg:mb-0">{value}</p>
    </div>
  );
};

export default QrCodeDisplay;
