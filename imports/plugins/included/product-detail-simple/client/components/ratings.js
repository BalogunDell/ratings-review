import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import RatingsForm from "./ratingsForm";
import { validator } from "./validateReviewInput";


class Ratings extends Component {
  constructor(props) {
    super(props);

    // define state for component
    this.state = {
      displayForm: false,
      addReviewBtn: true,
      title: "",
      reviewText: "",
      ratingValue: 0
    };

    // Bind button to this class
    this.showReviewForm = this.showReviewForm.bind(this);
    this.saveReview = this.saveReview.bind(this);
    this.cancelReview = this.cancelReview.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.getStarValue = this.getStarValue.bind(this);
  }

  showReviewForm() {
    this.setState({ displayForm: true, addReviewBtn: false });
  }

  /**
   * @param { object } event event on target element event
   * @memberof Ratings
   */
  saveReview(event) {
    event.preventDefault();
    const message = validator(this.state.title,
      this.state.reviewText,
      this.state.ratingValue);
      console.log(message); //eslint-disable-line
      console.log(this.state); //eslint-disable-line
  }

  /**
   * @param { object } event event on target element
   * @memberof Ratings
   */
  cancelReview() {
    this.setState({
      displayForm: false,
      addReviewBtn: true,
      title: "",
      reviewText: "" });
  }
  /**
   * @param { object } event event on target element
   * @memberof Ratings
   */
  handleUserInput(event) {
    event.preventDefault();
    this.setState({ [ event.target.name ]: event.target.value });
    Meteor.call("fetchRatings", (error, reply) => {
      if (error) {
        console.log(error, "disfdasifjasdigjidgjifgi"); //eslint-disable-line
      } else {
        console.log(reply, "meeeeeeeeeee"); //eslint-disable-line
      }
    });
  }

  /**
   * @param { object } event event on target element
   * @memberof Ratings
   */
  getStarValue(event) {
    this.setState({ ratingValue: event }); //eslint-disable-line
    console.log(event); //eslint-disable-line
  }

  render() {
    return (
      <div>
        <div>
          <RatingsForm
            showReviewForm = {this.showReviewForm}
            displayForm = {this.state.displayForm}
            saveReview = {this.saveReview}
            handleUserInput = {this.handleUserInput}
            addReviewBtn = {this.state.addReviewBtn}
            getStarValue = {this.getStarValue}
            cancelReview = {this.cancelReview}
          />
        </div>
      </div>
    );
  }
}

export default Ratings;

