// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TaskToken is ERC20 { // Bonus: Mock ERC-20
    constructor() ERC20("TaskCoin", "TASK") {}
    function mint(address to, uint256 amount) public { _mint(to, amount); }
}

contract BlockTask {
    struct Task { uint256 id; string content; bool completed; }
    Task[] public tasks;
    mapping(uint256 => address) public taskOwner;
    TaskToken public taskToken; // Bonus

    constructor() { taskToken = new TaskToken(); } // Bonus

    function addTask(string memory _content) external {
        tasks.push(Task(tasks.length, _content, false));
        taskOwner[tasks.length-1] = msg.sender;
    }

    function completeTask(uint256 _taskId) external {
        require(taskOwner[_taskId] == msg.sender, "Not your task!");
        tasks[_taskId].completed = true;
        taskToken.mint(msg.sender, 10 * 10**18); // Bonus: Mint 10 tokens
    }

    function deleteTask(uint256 _taskId) external {
        require(taskOwner[_taskId] == msg.sender, "Not your task!");
        delete tasks[_taskId];
    }
    
    function taskCount() public view returns (uint256) {
    return tasks.length;
}
}