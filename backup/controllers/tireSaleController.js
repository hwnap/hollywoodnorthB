const TireSale = require('../model/TireSale');
const mongoose = require('mongoose');

exports.getWeeklySales = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklySales = await TireSale.aggregate([
      { $match: { soldDate: { $gte: oneWeekAgo } } },
      { $group: { _id: null, totalSales: { $sum: "$soldPrice" } } }
    ]);

    res.json({ weeklySales: weeklySales[0] ? weeklySales[0].totalSales : 0 });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getMonthlySales = async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const monthlySales = await TireSale.aggregate([
      { $match: { soldDate: { $gte: oneMonthAgo } } },
      { $group: { _id: null, totalSales: { $sum: "$soldPrice" } } }
    ]);

    res.json({ monthlySales: monthlySales[0] ? monthlySales[0].totalSales : 0 });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await TireSale.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$soldPrice" } } }
    ]);

    res.json({ totalSales: totalSales[0] ? totalSales[0].totalSales : 0 });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
