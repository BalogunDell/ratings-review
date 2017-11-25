import React from "react";
import ReactStars from "react-stars";
import PropTypes from "prop-types";

const RatingsForm = ({
  showReviewForm,
  displayForm,
  saveReview,
  handleUserInput,
  addReviewBtn,
  getStarValue,
  cancelReview }) => {
  return (
    <div>
      {/* Div for product review and ratings */}
      <div className="row">
        <div>
          <h3>Product Ratings & Reviews</h3>
        </div>
        <div className="rating-holder">
          <div className="row">
            <img src="/resources/ratings.png"/>
            <h6 className="rating-fig">5.0</h6>
          </div>
        </div>
        <div className="row reviewBtn">
          {
            !addReviewBtn
              ?
              null
              :
              <button onClick={showReviewForm}>Add Review</button>
          }
          {/* Form */}
          {
            displayForm
              ?
              <div className="row reviewForm">
                <h4>Add New Review</h4>
                <form onSubmit={saveReview}>
                  {/* Stars for rating */}
                  <div className="form-group stars">
                    <label>Rate this product</label>
                    <br/>
                  </div>

                  <ReactStars
                    count={5}
                    onChange = {getStarValue}
                    size= {24}
                  />

                  {/* Title */}
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text"
                      className="form-control"
                      placeholder="Review title"
                      name = "title"
                      onChange={handleUserInput}
                    />
                  </div>

                  {/* textarea */}
                  <div className="form-group">
                    <label>Review</label>
                    <textarea type="text"
                      cols="10"
                      rows="10"
                      className="form-control"
                      name="reviewText"
                      placeholder="Enter your review"
                      onChange={handleUserInput}
                    />
                  </div>

                  <div className="form-group">
                    <input type="submit" value="post"/>
                    <input
                      type="button"
                      value="cancel"
                      onClick= {cancelReview}
                    />
                  </div>
                </form>
              </div>
              :
              null
          }
        </div>
        <div className="review-holder">
          <div className="row reviews">
            <h4>Bad product</h4>
            <p>Not good at all, don't buy</p>
            <p className="ratings">
              <i className="fa fa-star"/>
              <i className="fa fa-star"/>
            </p>
            {Date.now()}
          </div>

          <div className="row reviews">
            <h4>Good product</h4>
            <p>i love this product so much</p>
            <p className="ratings">
              <i className="fa fa-star"/>
              <i className="fa fa-star"/>
              <i className="fa fa-star"/>
            </p>
            {Date.now()}
          </div>

          <div className="row reviews">
            <h4>Good product</h4>
            <p>i love this product so much</p>
            <p className="ratings">
              <i className="fa fa-star"/>
              <i className="fa fa-star"/>
              <i className="fa fa-star"/>
              <i className="fa fa-star"/>
            </p>
            {Date.now()}
          </div>
        </div>
      </div>
    </div>
  );
};

RatingsForm.propTypes = {
  addReviewBtn: PropTypes.bool,
  cancelReview: PropTypes.func,
  displayForm: PropTypes.bool,
  getStarValue: PropTypes.func,
  handleUserInput: PropTypes.func,
  saveReview: PropTypes.func,
  showReviewForm: PropTypes.func
};

export default RatingsForm;
