
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div style={{marginTop:"100px"}} className='container-fluid px-3'>
      {pathSegments.length > 1 && (
        <nav>
          {pathSegments.map((segment, index) => (
            <span className='fs-6' key={index}>
              <Link className={`${index >= pathSegments.length - 1?"text-decoration-none text-black":"text-main fw-bold"}`} to={`/${pathSegments.slice(0, index + 1).join('/')}`}>{segment}</Link>
              {index < pathSegments.length - 1 && <i className="fa-solid mx-2 fa-arrow-right"></i>}
            </span>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
