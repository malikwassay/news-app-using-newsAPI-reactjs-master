import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsId } = this.props;

    return (
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={!imageUrl ? "/download.png" : imageUrl}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title ? title : ""}</h5>
          <p className="card-text">{description ? description : ""}</p>
          <a
            href={newsId}
            target="_blank"
            rel="noopener noreferrer" // Added for security when using target="_blank"
            className="btn btn-primary btn-sm"
            aria-label="Read more about this news"
          >
            See more
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
