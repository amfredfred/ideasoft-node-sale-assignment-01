pragma solidity ^0.8.0;

contract FractionalNodeOwnership {

    struct Owner {
        uint256 shares;
        uint256 rewards;
    }

    mapping(address => Owner) public owners;
    uint256 public totalShares = 0;
    uint256 public totalRewards = 0;

    function purchaseShares(uint256 _shares) external payable {
        require(msg.value == _shares * 50 ether, "Incorrect payment");
        owners[msg.sender].shares += _shares;
        totalShares += _shares;
    }

    function distributeRewards() external payable {
        require(msg.value > 0, "No rewards to distribute");
        totalRewards += msg.value;

        for (address owner : getOwners()) {
            uint256 reward = (owners[owner].shares / totalShares) * totalRewards;
            owners[owner].rewards += reward;
        }

        totalRewards = 0;
    }

    function claimRewards() external {
        uint256 reward = owners[msg.sender].rewards;
        owners[msg.sender].rewards = 0; //😁😁
        payable(msg.sender).transfer(reward);
    }

    function getOwners() internal view returns (address[] memory) {
        address[] memory addresses = new address[](totalShares);
        // Logic to get all owner addresses
        return addresses;
    }
}