const ReviewModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, DATE, TIMESTAMP} = Sequelize
    const Review = sequelize.define('Review', {
        ReviewId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        asin: {type: STRING, primaryKey: false, allowNull: false},
        helpful: STRING,
        overall: INTEGER,
        reviewText: STRING,
        reviewTime: DATE,
        reviewerID: STRING,
        reviewerName: STRING,
        summary: STRING,
        unixReviewTime: TIMESTAMP
    })
    return Review
}

module.exports = ReviewModel