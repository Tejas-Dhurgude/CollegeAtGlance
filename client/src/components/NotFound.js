import React, { useEffect, useState } from 'react';
import "./Diary.scss";

const NotFound = () => {
  const [marginTop, setMarginTop] = useState('10%');
  const [marginBottom, setmarginBottom] = useState('10%');

  const adjustMargin = () => {
    if (window.innerWidth < 1200) {
      setMarginTop('20%');
      setmarginBottom('20%');
    } else {
      setMarginTop('10%');
      setmarginBottom('10%');
    }
  };

  useEffect(() => {
    // Initial adjustment
    adjustMargin();

    // Adjust on window resize
    window.addEventListener('resize', adjustMargin);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', adjustMargin);
    };
  }, []);

  return (
    <>
      <div className='circle'></div> {/* Circle as fixed background */}
      <div className='rectangle'></div>
      <div style={{ margin: '20%', marginTop, marginBottom, fontSize: '50px', fontWeight: 'bold', color: '#7AB2B2' }}>
        404: Page Not Found
      </div>
      <div className="animated-element"></div>
    </>
  );
};

export default NotFound;

