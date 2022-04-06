const config = require('./config');
const ethers = require('ethers');
const input = require("input");
require('dotenv').config();
/**
 ** Don't Change this file, change settings in config.js
 **/


async function getUserInput() {
    const choices = ['Default', 'Buy All Tokens', 'Buy Only Low Liquidity Tokens 1-90 BNB', 'Buy Only Medium Liquidity Tokens 150-300 BNB', 'Buy Only High Liquidity Tokens 300-700 BNB', 'Buy Strategy LL and ML', 'Custom Strategy']
    const choices2 = ['COINMARKETCAP', 'COINGECKO', 'BOTH'];
    const choices3 = ['Yes', 'No'];
    const nodes = [`Node 1: ${process.env.node}` , `Node 2: ${process.env.node2}`, `Node 3: ${process.env.node3}`];
    const channelChoices = ['CoinGecko & CoinMarketCap Listing Alerts', 'Coinmarketcap Fastest Alerts'];
    await input.select('Welcome, please choose a buying strategy', choices).then(async function (answers) {
        if (answers == 'Buy All Tokens') {
            config.numberOfTokensToBuy = parseInt(await input.text("Enter number of different tokens you want to buy"));
            config.buyAllTokensStrategy.investmentAmount = await input.text("Enter Investment Amount in BNB");
            config.buyAllTokensStrategy.gasPrice = ethers.utils.parseUnits(await input.text("Enter Gas Price"), 'gwei');
            config.buyAllTokensStrategy.profitPercent = parseFloat(await input.text("Enter profit percent you want"));
            config.buyAllTokensStrategy.stopLossPercent = parseFloat(await input.text("Enter max loss percent"));
            config.buyAllTokensStrategy.trailingStopLossPercent = parseFloat(await input.text("Enter trailing stop loss percent"));
            config.buyAllTokensStrategy.percentOfTokensToSellProfit = parseFloat(await input.text("Enter percent of tokens to sell when profit reached"));
            config.buyAllTokensStrategy.percentOfTokensToSellLoss = parseFloat(await input.text("Enter percent of tokens to sell when stop loss reached"));
            await input.select('Choose a channel to buy from', channelChoices).then(async function (channelAnswer) {
                if (channelAnswer == "CoinGecko & CoinMarketCap Listing Alerts") {
                    config.channel = 'CGCMC'
                } else {
                    config.channel = 'CFA'
                }
            });
            config.userStrategy = 'BA';
        }
        if (answers == "Buy Only Low Liquidity Tokens 1-150 BNB") {
            config.numberOfTokensToBuy = parseInt(await input.text("Enter number of different tokens you want to buy"));
            config.strategyLL.investmentAmount = await input.text("Enter Investment Amount in BNB");
            config.strategyLL.gasPrice = ethers.utils.parseUnits(await input.text("Enter Gas Price"), 'gwei');
            config.strategyLL.maxBuyTax = parseFloat(await input.text("Enter max buying tax"));
            config.strategyLL.minBuyTax = parseFloat(await input.text("Enter min buying tax"));
            config.strategyLL.maxSellTax = parseFloat(await input.text("Enter max sell tax"));
            config.strategyLL.profitPercent = parseFloat(await input.text("Enter profit percent you want"));
            config.strategyLL.stopLossPercent = parseFloat(await input.text("Enter max loss percent"));
            config.strategyLL.trailingStopLossPercent = parseFloat(await input.text("Enter trailing stop loss percent"));
            config.strategyLL.percentOfTokensToSellProfit = parseFloat(await input.text("Enter percent of tokens to sell when profit reached"));
            config.strategyLL.percentOfTokensToSellLoss = parseFloat(await input.text("Enter percent of tokens to sell when stop loss reached"));
            await input.select('Choose a channel to buy from', channelChoices).then(async function (channelAnswer) {
                if (channelAnswer == "CoinGecko & CoinMarketCap Listing Alerts") {
                    config.channel = 'CGCMC'
                    await input.select('Choose coinmarketcap or coingecko', choices2).then(async function (answers2) {
                        if (answers2 == "COINMARKETCAP") {
                            config.strategyML.platform = "COINMARKETCAP";
                        } else if (answers2 == "BOTH") {
                            config.strategyML.platform = "BOTH";
                        } else {
                            config.strategyML.platform = "COINGECKO";
                        }
                    });
                } else {
                    config.channel = 'CFA'
                }
            });
            config.userStrategy = 'LL';
        }
        if (answers == "Buy Only Medium Liquidity Tokens 150-300 BNB") {
            config.numberOfTokensToBuy = parseInt(await input.text("Enter number of different tokens you want to buy"));
            config.strategyML.investmentAmount = await input.text("Enter Investment Amount in BNB");
            config.strategyML.gasPrice = ethers.utils.parseUnits(await input.text("Enter Gas Price"), 'gwei');
            config.strategyML.maxBuyTax = parseFloat(await input.text("Enter max buying tax"));
            config.strategyML.minBuyTax = parseFloat(await input.text("Enter min buying tax"));
            config.strategyML.maxSellTax = parseFloat(await input.text("Enter max sell tax"));
            config.strategyML.profitPercent = parseFloat(await input.text("Enter profit percent you want"));
            config.strategyML.stopLossPercent = parseFloat(await input.text("Enter max loss percent"));
            config.strategyML.trailingStopLossPercent = parseFloat(await input.text("Enter trailing stop loss percent"));
            config.strategyML.percentOfTokensToSellProfit = parseFloat(await input.text("Enter percent of tokens to sell when profit reached"));
            config.strategyML.percentOfTokensToSellLoss = parseFloat(await input.text("Enter percent of tokens to sell when stop loss reached"));
            await input.select('Choose a channel to buy from', channelChoices).then(async function (channelAnswer) {
                if (channelAnswer == "CoinGecko & CoinMarketCap Listing Alerts") {
                    config.channel = 'CGCMC'
                    await input.select('Choose coinmarketcap or coingecko', choices2).then(async function (answers2) {
                        if (answers2 == "COINMARKETCAP") {
                            config.strategyML.platform = "COINMARKETCAP";
                        } else if (answers2 == "BOTH") {
                            config.strategyML.platform = "BOTH";
                        } else {
                            config.strategyML.platform = "COINGECKO";
                        }
                    });
                } else {
                    config.channel = 'CFA'
                }
            });

            config.userStrategy = 'ML';

        }
        if (answers == "Buy Only High Liquidity Tokens 300-700 BNB") {
            config.numberOfTokensToBuy = parseInt(await input.text("Enter number of different tokens you want to buy"));
            config.strategyHL.investmentAmount = await input.text("Enter Investment Amount in BNB");
            config.strategyHL.gasPrice = ethers.utils.parseUnits(await input.text("Enter Gas Price"), 'gwei');
            config.strategyHL.maxBuyTax = parseFloat(await input.text("Enter max buying tax"));
            config.strategyHL.minBuyTax = parseFloat(await input.text("Enter min buying tax"));
            config.strategyHL.maxSellTax = parseFloat(await input.text("Enter max sell tax"));
            config.strategyHL.profitPercent = parseFloat(await input.text("Enter profit percent you want"));
            config.strategyHL.stopLossPercent = parseFloat(await input.text("Enter max loss percent"));
            config.strategyHL.trailingStopLossPercent = parseFloat(await input.text("Enter trailing stop loss percent"));
            config.strategyHL.percentOfTokensToSellProfit = parseFloat(await input.text("Enter percent of tokens to sell when profit reached"));
            config.strategyHL.percentOfTokensToSellLoss = parseFloat(await input.text("Enter percent of tokens to sell when stop loss reached"));
            await input.select('Choose a channel to buy from', channelChoices).then(async function (channelAnswer) {
                if (channelAnswer == "CoinGecko & CoinMarketCap Listing Alerts") {
                    config.channel = 'CGCMC'
                    await input.select('Choose coinmarketcap or coingecko', choices2).then(async function (answers2) {
                        if (answers2 == "COINMARKETCAP") {
                            config.strategyML.platform = "COINMARKETCAP";
                        } else if (answers2 == "BOTH") {
                            config.strategyML.platform = "BOTH";
                        } else {
                            config.strategyML.platform = "COINGECKO";
                        }
                    });
                } else {
                    config.channel = 'CFA'
                }
            });

            config.userStrategy = 'HL';
        }
        if (answers == "Custom Strategy") {
            config.numberOfTokensToBuy = parseInt(await input.text("Enter number of different tokens you want to buy"));
            config.customStrategy.investmentAmount = await input.text("Enter Investment Amount in BNB");
            config.customStrategy.gasPrice = ethers.utils.parseUnits(await input.text("Enter Gas Price"), 'gwei');
            config.customStrategy.minLiquidity = parseFloat(await input.text("Enter minimum liquidity"));
            config.customStrategy.maxLiquidity = parseFloat(await input.text("Enter maximum liquidity"));
            config.customStrategy.maxBuyTax = parseFloat(await input.text("Enter max buying tax"));
            config.customStrategy.minBuyTax = parseFloat(await input.text("Enter min buying tax"));
            config.customStrategy.maxSellTax = parseFloat(await input.text("Enter max sell tax"));
            config.customStrategy.profitPercent = parseFloat(await input.text("Enter profit percent you want"));
            config.customStrategy.stopLossPercent = parseFloat(await input.text("Enter max loss percent"));
            config.customStrategy.trailingStopLossPercent = parseFloat(await input.text("Enter trailing stop loss percent"));
            config.customStrategy.percentOfTokensToSellProfit = parseFloat(await input.text("Enter percent of tokens to sell when profit reached"));
            config.customStrategy.percentOfTokensToSellLoss = parseFloat(await input.text("Enter percent of tokens to sell when stop loss reached"));
            await input.select('Choose a channel to buy from', channelChoices).then(async function (channelAnswer) {
                if (channelAnswer == "CoinGecko & CoinMarketCap Listing Alerts") {
                    config.channel = 'CGCMC'
                    await input.select('Choose coinmarketcap or coingecko', choices2).then(async function (answers2) {
                        if (answers2 == "COINMARKETCAP") {
                            config.strategyML.platform = "COINMARKETCAP";
                        } else if (answers2 == "BOTH") {
                            config.strategyML.platform = "BOTH";
                        } else {
                            config.strategyML.platform = "COINGECKO";
                        }
                    });
                } else {
                    config.channel = 'CFA'
                }
            });
            config.userStrategy = 'Custom';
        }
        if (answers == "Buy Strategy LL and ML") {
            console.log("THis Strategy Uses:")
            console.log("The min liquidity of this strategy is: 20BNB and the max liquidity is: 150BNB")
            config.numberOfTokensToBuy = parseInt(await input.text("Enter number of different tokens you want to buy"));
            await input.select('Choose a node to use', nodes).then(async function (nodesAnswer) {
                let nodeChoose = nodesAnswer.split(": ");
                if(nodeChoose[0] == "Node 1") {
                    config.node = nodeChoose[1];
                } else if (nodeChoose[0] == "Node 2") {
                    config.node = nodeChoose[1];
                } else if (nodeChoose[0] == "Node 3") {
                    config.node = nodeChoose[1];
                };
                console.log("You Choose: " + config.node);
            });
            config.Strategy.investmentAmount = await input.text("Enter Investment Amount in BNB");
            config.Strategy.gasPrice = ethers.utils.parseUnits(await input.text("Enter Gas Price"), 'gwei');
            config.Strategy.maxBuyTax = parseFloat(await input.text("Enter max buying tax"));
            config.Strategy.minBuyTax = parseFloat(await input.text("Enter min buying tax"));
            config.Strategy.maxSellTax = parseFloat(await input.text("Enter max sell tax"));
            config.Strategy.profitPercent = parseFloat(await input.text("Enter profit percent you want"));
            config.Strategy.stopLossPercent = parseFloat(await input.text("Enter max loss percent"));
            config.Strategy.percentOfTokensToSellProfit = parseFloat(await input.text("Enter percent of tokens to sell when profit reached"));
            config.Strategy.percentOfTokensToSellLoss = parseFloat(await input.text("Enter percent of tokens to sell when stop loss reached"));
            let selectchoices = "Number of Tokens To Buy: " + config.numberOfTokensToBuy + " Investment Amount: " + config.Strategy.investmentAmount + " BNB";
            selectchoices += " Profit Percent: " + config.Strategy.profitPercent + "% Min-Max Liquidity: " + config.Strategy.minLiquidity + "-" + config.Strategy.maxLiquidity;
            selectchoices += " Min-Max Buy Tax: " + config.Strategy.minBuyTax + "-" + config.Strategy.maxBuyTax + " Stop Loss Percent: " + config.Strategy.stopLossPercent + "%";
            await input.select(selectchoices + " Ïs Correct?", choices3).then(async function (answers) {
                if (answers == "No") {
                    config.numberOfTokensToBuy = parseInt(await input.text("Enter number of different tokens you want to buy"));
                    config.Strategy.investmentAmount = await input.text("Enter Investment Amount in BNB");
                    config.Strategy.gasPrice = ethers.utils.parseUnits(await input.text("Enter Gas Price"), 'gwei');
                    config.Strategy.maxBuyTax = parseFloat(await input.text("Enter max buying tax"));
                    config.Strategy.minBuyTax = parseFloat(await input.text("Enter min buying tax"));
                    config.Strategy.maxSellTax = parseFloat(await input.text("Enter max sell tax"));
                    config.Strategy.profitPercent = parseFloat(await input.text("Enter profit percent you want"));
                    config.Strategy.stopLossPercent = parseFloat(await input.text("Enter max loss percent"));
                    config.Strategy.percentOfTokensToSellProfit = parseFloat(await input.text("Enter percent of tokens to sell when profit reached"));
                    config.Strategy.percentOfTokensToSellLoss = parseFloat(await input.text("Enter percent of tokens to sell when stop loss reached"));
                }
            });
            await input.select('Choose a channel to buy from', channelChoices).then(async function (channelAnswer) {
                if (channelAnswer == "CoinGecko & CoinMarketCap Listing Alerts") {
                    config.channel = 'CGCMC'
                    await input.select('Choose coinmarketcap or coingecko', choices2).then(async function (answers2) {
                        if (answers2 == "COINMARKETCAP") {
                            config.Strategy.platform = "COINMARKETCAP";
                        } else if (answers2 == "BOTH") {
                            config.Strategy.platform = "BOTH";
                        } else {
                            config.Strategy.platform = "COINGECKO";
                        }
                    });
                } else {
                    config.channel = 'CFA'
                }
            });
            config.userStrategy = 'LLML';
        }

    });
}

module.exports = {
    getUserInput
}