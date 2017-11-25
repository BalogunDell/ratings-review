export function validator(title, reviewText, rating) {
  let message = "";
  const regex = /(d+)$/gi;
  if (rating === 0) {
    message = "Please rate this product";
  } else if (title === "") {
    message = "Please enter a title for this review";
  } else if (reviewText === "") {
    message = "Please enter a review message";
  } else if (regex.test(title)) {
    message = "Invalid title";
  } else if (regex.test(reviewText)) {
    message = "Invalid message";
  } else {
    return "";
  }

  return message;
}
