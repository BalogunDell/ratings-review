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
    if (!this._userId) {
      return false;
    }
    userObject.userId = Meteor.userId();
    Collections.Ratings.insert(userObject);
  }
});

