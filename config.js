export const CONTRACT_ADDRESS = "0xb97Abf92a9eBb99D8B8D3236586E43FeC0b0Cf19"; 
export const TASK_ABI = [
    {
        "abi": [
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_content",
                "type": "string"
              }
            ],
            "name": "addTask",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
              }
            ],
            "name": "completeTask",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
              }
            ],
            "name": "deleteTask",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "taskCount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "tasks",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "content",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "completed",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]
      }
];