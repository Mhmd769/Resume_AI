import React from 'react';
import PropTypes from 'prop-types';

function SummeryPreview({ resumeInfo }) {
  return (
    <div className='p-4 shadow-lg rounded-lg border-primary border-t-4 mt-5'>
      <h2 className='text-center font-bold text-2xl'>Summary</h2>
      <p className='text-l'>{resumeInfo?.summary || 'Summary not available'}</p>
    </div>
  );
}

SummeryPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    summary: PropTypes.string,
  }),
};

SummeryPreview.defaultProps = {
  resumeInfo: {},
};

export default SummeryPreview;
