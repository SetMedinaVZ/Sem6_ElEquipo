import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

import './escaner.css';

const createConfig = (props) => {
  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Escaner = (props) => {
  const qrcodeRegionId = 'qrcode-region';

  useEffect(() => {

    const config = createConfig(props);
    const verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw new Error('qrCodeSuccessCallback is a required callback.');
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default Escaner;