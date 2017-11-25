import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @name Ratings
 * @memberof schemas
 * @type {SimpleSchema}
 * @property {Number} rating required
 * @property {String} reviewtext optional
 * @property {Number} productId required
 * @property {Number} userId required
 * @property {String} createdBy optional
 * @property {Date} createdAt required
 * @property {Date} updatedAt required
 */
export const Ratings = new SimpleSchema({
  rating: {
    type: Number,
    optional: true
  },
  reviewtext: {
    type: String,
    optional: true
  },
  productId: {
    type: Number,
    optional: true
  },
  userId: {
    type: Number,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    }
  }
});

registerSchema("Ratings",  Ratings);
