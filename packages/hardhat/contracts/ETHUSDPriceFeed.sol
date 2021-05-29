import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// A static price feed contract to use locally.
contract ETHUSDPriceFeed is AggregatorV3Interface {
    function decimals() external pure override returns (uint8) {
        return 18;
    }

    function description() external pure override returns (string memory) {
        return "Static ETH/USD price feed. Do not use in production.";
    }

    function version() external pure override returns (uint256) {
        return 0;
    }

    function getRoundData(uint80)
        external
        pure
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, 2000E18, 0, 0, 0);
    }

    function latestRoundData()
        external
        pure
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, 2000E18, 0, 0, 0);
    }
}