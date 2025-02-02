import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainCard = ({ title, description, imageUrl, newsUrl, author, date }) => {
  const hasImage = !!imageUrl;

  const openLinkFunc = () => {
    window.open(newsUrl || "https://www.example.com", '_blank');
  };

  return (
    <div
      className="card shadow-sm"
      style={{
        borderRadius: '10px',
        margin: '10px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={openLinkFunc} // Open link when card is clicked
    >
      {hasImage ? (
        <img
          src={imageUrl}
          className="card-img-top"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
          alt={title}
        />
      ) : (
        <div
          style={{
            height: '220px',
            width: '100%',
            backgroundColor: '#e0e0e0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            color: '#999',
          }}
        >
          No Image Available
        </div>
      )}

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description || "No Description Available"}</p>
        <p className="card-text"><small>By {author || "Unknown Author"}</small></p>
        <p className="card-text"><small>{date}</small></p>
      </div>
    </div>
  );
};

export default MainCard;
