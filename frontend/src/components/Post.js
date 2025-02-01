import { Link } from "react-router-dom";

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const truncateContent = (content, length) => {
  return content.length > length
    ? content.substring(0, length) + "..."
    : content;
};

export default function Post({ post, value }) {
  const plainTextContent = stripHtml(post.content);
  const truncatedContent = truncateContent(plainTextContent, value || 140);

  return (
    <div className="card mb-4">
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <img
            className="img-fluid h-100 card-img-top"
            src={post.image}
            alt="..."
          />
        </div>
        <div className="card-body col-md-8">
          <h5 className="card-title" style={{color: "#03045e"}}>{post.title}</h5>
          <p className="card-text">{truncatedContent}...</p>
          <Link to={`/posts/${post._id}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
