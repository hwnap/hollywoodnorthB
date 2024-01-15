const TireSale = require("../model/TireSale");
const User = require("../model/User");
const mongoose = require("mongoose");
const dayjs = require('dayjs');

// exports.getWeeklySales = async (req, res) => {
//   try {
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//     const weeklySales = await TireSale.aggregate([
//       { $match: { soldDate: { $gte: oneWeekAgo } } },
//       { $group: { _id: null, totalSales: { $sum: "$soldPrice" } } },
//     ]);

//     res.json({ weeklySales: weeklySales[0] ? weeklySales[0].totalSales : 0 });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// exports.getMonthlySales = async (req, res) => {
//   try {
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

//     const monthlySales = await TireSale.aggregate([
//       { $match: { soldDate: { $gte: oneMonthAgo } } },
//       { $group: { _id: null, totalSales: { $sum: "$soldPrice" } } },
//     ]);

//     res.json({
//       monthlySales: monthlySales[0] ? monthlySales[0].totalSales : 0,
//     });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await TireSale.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$soldPrice" } } },
    ]);

    res.json({ totalSales: totalSales[0] ? totalSales[0].totalSales : 0 });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await TireSale.find({})
      .populate({
        path: "userId",
        select: "username", // Select only the username field from the User model
      })
      .populate("tireId", "brand size")
      .sort({ soldDate: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getWeeklySales = async (req, res) => {
    try {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);
  
      const weeklySales = await TireSale.aggregate([
        {
          $match: {
            soldDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$soldPrice" },
          },
        },
      ]);
  
      res.json({ weeklySales: weeklySales[0] ? weeklySales[0].totalSales : 0 });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  exports.getMonthlySales = async (req, res) => {
    try {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);
  
      const monthlySales = await TireSale.aggregate([
        {
          $match: {
            soldDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$soldPrice" },
          },
        },
      ]);
  
      res.json({ monthlySales: monthlySales[0] ? monthlySales[0].totalSales : 0 });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

  exports.getReportsByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      // Use dayjs to format startDate and endDate to 'YYYY-MM-DD' format
      const start = dayjs(startDate).format('YYYY-MM-DD');
      const end = dayjs(endDate).format('YYYY-MM-DD');
  
      // Fetch reports within the specified date range
      const reports = await TireSale.find({
        soldDate: { $gte: start, $lte: end },
      }).populate('userId', 'username');;
  
      res.json(reports);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };