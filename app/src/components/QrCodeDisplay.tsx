import React from 'react';
import QRCode from 'react-qr-code';

const QrCodeDisplay = ({ value }: { value: string }) => {
  return (
    <div className="flex flex-col items-center">
      <QRCode value={value} size={256} />
      <p className="mt-4 text-lg font-mono">{value}</p>
    </div>
  );
};

export default QrCodeDisplay;
