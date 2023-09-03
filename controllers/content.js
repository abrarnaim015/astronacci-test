const getContentForPublicApi = require("../helpers/getContentForPublicApi");
const { verifyToken } = require("../helpers/jwt");
const { CategoryContents, Users } = require("../models");
const ContentJSON = require("../config/contents.json");

class ContentController {
  static async getAllCategoryContents(req, res, next) {
    try {
      const categoryContentsDB = await CategoryContents.findAll();

      const result = {
        meta: {
          status: "Success",
          code: 200,
          msg: "Successfully Get All Content Category",
          data: new Date(),
        },
        data: categoryContentsDB,
        error: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryContentByName(req, res, next) {
    try {
      const { name } = req.query;
      const findContentCategoryDB = await CategoryContents.findOne({
        where: { name },
      });

      const result = {
        meta: {
          status: "Success",
          code: 200,
          msg: "Successfully Get Content Category By Name",
          data: new Date(),
        },
        data: findContentCategoryDB,
        error: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllContent(req, res, next) {
    try {
      const { category } = req.query;
      const getAllContentaFormPublicAPI = await getContentForPublicApi(
        category
      );

      if (!getAllContentaFormPublicAPI) {
        throw {
          status: 400,
          message: "Terjadi kesalahan dalam mengambil data dari API.",
        };
      }

      const result = {
        meta: {
          status: "Success",
          code: 200,
          msg: "Successfully Get Contents",
          data: new Date(),
        },
        data: getAllContentaFormPublicAPI,
        error: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getContentByMembershipType(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { category } = req.query;

      const checkUserByToken = verifyToken(access_token);
      if (!checkUserByToken) {
        throw {
          status: 400,
          message: "Token does not exist",
        };
      }

      const userDB = await Users.findOne({
        where: { id: checkUserByToken.id },
      });

      // const getAllContentaFormPublicAPI = await getContentForPublicApi(
      //   category
      // );
      let getAllContentaFormPublicAPI = ContentJSON;
      switch (userDB.membershipType) {
        case "A":
          // getAllContentaFormPublicAPI.articles =
          //   getAllContentaFormPublicAPI.articles.slice(0, 3);
          // getAllContentaFormPublicAPI.totalResults = 3;
          getAllContentaFormPublicAPI = ContentJSON.slice(0, 3);
          break;
        case "B":
          // getAllContentaFormPublicAPI.articles =
          //   getAllContentaFormPublicAPI.articles.slice(0, 10);
          getAllContentaFormPublicAPI = ContentJSON.slice(0, 10);
          break;
        default:
          break;
      }

      // getAllContentaFormPublicAPI.totalResults =
      //   getAllContentaFormPublicAPI.articles.length;

      const result = {
        meta: {
          status: "Success",
          code: 200,
          msg: "Successfully Get Contents",
          data: new Date(),
        },
        data: getAllContentaFormPublicAPI,
        error: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ContentController;
