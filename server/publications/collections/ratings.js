import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";

/**
 * Themes
 * @returns {Object} Ratings
 */

Meteor.methods({
  fetchRatings: function () {
    Collections.Ratings.find();
  }
});
