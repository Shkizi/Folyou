module.exports.getUserById = require("./User/getUserById.js");

module.exports.getUsers = require("./User/getUsers.js");

module.exports.getUserLogin = require("./User/getUserLogin.js");
module.exports.getUserBySession = require("./User/getUserBySession.js");

module.exports.putClicks = require("./Clicks/putClicks.js");

module.exports.getPortfolioById = require("./Portfolio/getPortfolioById.js");
module.exports.getPortfolioByIdRecent = require("./Portfolio/getPortfolioByIdRecent.js");
module.exports.getPortfolioByIdUser = require("./Portfolio/getPortfolioByIdUser.js");
module.exports.getTrendingPortfolio = require("./Portfolio/getTrendingPortfolio.js");

module.exports.getProposalByApplicationIdUser = require("./Proposal/getProposalByApplicationIdUser.js");

module.exports.getProposalByIdRecent = require("./Proposal/getProposalByIdRecent.js");
module.exports.getProposalByIdUser = require("./Proposal/getProposalByIdUser.js");
module.exports.getProposalByIdProposal = require("./Proposal/getProposalByIdProposal.js");
module.exports.getTrendingProposal = require("./Proposal/getTrendingProposal.js");
module.exports.putCreateProposal = require("./Proposal/putCreateProposal.js");
module.exports.getProposalById = require("./Proposal/getProposalById.js");

module.exports.getTalentById = require("./Talent/getTalentById.js");
module.exports.getTalentByIdRecent = require("./Talent/getTalentByIdRecent.js");
module.exports.getTalentByIdUser = require("./Talent/getTalentByIdUser.js");

module.exports.getCategories = require("./Category/getCategories.js");
module.exports.getKeywords = require("./Keyword/getKeywords.js");

module.exports.putApplication = require("./Application/putApplication.js");
module.exports.postCreateSheet = require("./Portfolio/postCreateSheet.js");


module.exports.getRecomendNumberByIdUser = require("./Recommend/getRecomendNumberByIdUser.js");
module.exports.getRecomendBoolFromIds = require("./Recommend/getRecomendBoolFromIds.js");




module.exports.dbconnect = require("./dbconnect.js");


