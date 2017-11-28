import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import RatingsForm from "./ratingsForm";
import { Reaction } from "/client/api";
import { setTimeout } from "timers";


class Ratings extends Component {
  constructor(props) {
    super(props);

    this.productInfo = { ...this.props };
    // define state for component
    this.state = {
      displayForm: false,
      addReviewBtn: true,
      reviewText: "",
      ratingValue: 0,
      errorMessage: "",
      errorStatus: false,
      reviews: []
    };

    // Bind button to this class
    this.showReviewForm = this.showReviewForm.bind(this);
    this.saveReview = this.saveReview.bind(this);
    this.cancelReview = this.cancelReview.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.getStarValue = this.getStarValue.bind(this);
  }

  /**
   * 
   * @returns { object } updated state
   * @memberof Ratings
   */
  componentWillMount() {
    if (Reaction.hasPermission("admin") || Meteor.user().emails.length === 0) {
      this.setState({ displayForm: false, addReviewBtn: false });
    } // eslint-disable-line

    Meteor.call("fetchRatings", this.productInfo.product._id, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ reviews: response });
      }
    });

    Meteor.call("fetchOrders", this.productInfo.product._id, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          this.setState({ addReviewBtn: false });
        } else {
          result[0].items.forEach((item) => {
            if (item.productId === this.productInfo.product._id) {
              this.setState({ addReviewBtn: true });
            } else {
              this.setState({ addReviewBtn: false });
            }
          });
        }
      }
    });
  }

  /**
   * 
   * @returns updated state
   * @memberof Ratings
   */
  showReviewForm() {
    this.setState({ displayForm: true, addReviewBtn: false });
  }

  /**
   * @param { object } event event on target element event
   * @memberof Ratings
   */
  saveReview(event) {
    event.preventDefault();
    console.log(Meteor.user());
    this.setState({
      errorStatus: false,
      errorMessage: "",
      canRateProduct: false
    });

    if ((this.state.ratingValue) === 0 && (!this.state.reviewText)) {
      this.setState({ errorStatus: true, errorMessage: "Please rate the product or enter a review" });
    } else if ((this.state.ratingValue) > 0 && (!this.state.reviewText)) {
      // Compose ratings and review object using details from users
      const ratingsObject = {
        rating: this.state.ratingValue,
        reviewtext: "No review yet",
        title: Meteor.user().name,
        productId: this.productInfo.product._id
      };


      //  Save ratings to the database
      Meteor.call("saveRatings", ratingsObject, (error, reply) => {
        if (error) {
          console.log(error); //eslint-disable-line
        } else {
          this.setState({
            reviews: reply
          });
          setTimeout(() => {
            this.cancelReview();
          }, 1000);
        }
      });
    } else {
      // Compose ratings and review object using details from users
      const ratingsObject = {
        rating: this.state.ratingValue,
        reviewtext: this.state.reviewText,
        title: Meteor.user().name,
        productId: this.productInfo.product._id
      };

      //  Save ratings to the database
      Meteor.call("saveRatings", ratingsObject, (error, reply) => {
        if (error) {
          console.log(error); //eslint-disable-line
        } else {
          this.setState({
            reviews: reply,
            reviewText: "",
            ratingValue: 0 });
        }
        setTimeout(() => {
          this.cancelReview();
        }, 1000);
      });
    }
  }

  /**
   * @param { object } event event on target element
   * @memberof Ratings
   */
  cancelReview() {
    this.setState({
      displayForm: false,
      addReviewBtn: true,
      errorStatus: false,
      errorMessage: "",
      reviewText: "",
      ratingValue: 0 });
  }
  /**
   * @param { object } event event on target element
   * @memberof Ratings
   */
  handleUserInput(event) {
    event.preventDefault();
    this.setState({
      [ event.target.name ]: event.target.value,
      errorMessage: "",
      errorStatus: false });
  }

  /**
   * @param { object } event event on target element
   * @memberof Ratings
   */
  getStarValue(event) {
    this.setState({ ratingValue: event }); //eslint-disable-line
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
            value= {this.state.ratingValue}
            reviews = {this.state.reviews}
            errorStatus = {this.state.errorStatus}
            errorMessage = {this.state.errorMessage}
          />
        </div>
      </div>
    );
  }
}

export default Ratings;

