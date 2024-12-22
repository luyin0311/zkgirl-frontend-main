import Pdf from '@src/image/legend-games-tos.pdf';
import React from 'react';

const PdfViewer: React.FC = () => {
  return <iframe style={{ width: '100vw', height: '100vh' }} src={Pdf}></iframe>;
};

export default PdfViewer;
