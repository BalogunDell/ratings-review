import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
import { check } from "meteor/check";

/**
 * Themes
 * @returns {Object} Ratings
 */

Meteor.methods({
  saveRatings: function (userObject) {
    check(userObject, Object);
    userObject.userId = Meteor.userId();
    userObject.productId = 3;
    Collections.Ratings.insert(userObject);
  }
});

Meteor.publish("Ratings", function () {
  return Collections.Ratings.find();
});

