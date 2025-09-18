// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/solidity/contracts/FHE.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title CipherGrantLab
 * @dev Privacy-preserving grant management platform using FHE encryption
 * @author Xavier4Dev
 */
contract CipherGrantLab is Ownable, ReentrancyGuard {
    using FHE for euint32;
    using FHE for euint64;
    using FHE for euint256;
    using FHE for bool;

    // Grant structure with encrypted data
    struct Grant {
        euint32 id;
        euint256 amount;
        euint32 deadline;
        euint32 maxApplicants;
        euint32 currentApplicants;
        bool isActive;
        address grantor;
        string encryptedDescription;
    }

    // Application structure with encrypted data
    struct Application {
        euint32 grantId;
        euint256 requestedAmount;
        euint32 score;
        bool isApproved;
        address applicant;
        string encryptedProposal;
    }

    // State variables
    mapping(uint32 => Grant) public grants;
    mapping(uint32 => mapping(address => Application)) public applications;
    mapping(address => euint32[]) public userApplications;
    
    uint32 public nextGrantId;
    uint32 public nextApplicationId;
    
    IERC20 public token;
    
    // Events
    event GrantCreated(uint32 indexed grantId, address indexed grantor, uint256 amount);
    event ApplicationSubmitted(uint32 indexed grantId, address indexed applicant);
    event ApplicationApproved(uint32 indexed grantId, address indexed applicant, uint256 amount);
    event GrantFunded(uint32 indexed grantId, uint256 amount);
    event GrantClosed(uint32 indexed grantId);

    constructor(address _token) {
        token = IERC20(_token);
    }

    /**
     * @dev Create a new grant with encrypted parameters
     * @param amount Encrypted grant amount
     * @param deadline Encrypted deadline timestamp
     * @param maxApplicants Encrypted maximum number of applicants
     * @param description Encrypted grant description
     */
    function createGrant(
        euint256 amount,
        euint32 deadline,
        euint32 maxApplicants,
        string memory description
    ) external onlyOwner {
        uint32 grantId = nextGrantId++;
        
        grants[grantId] = Grant({
            id: FHE.asEuint32(grantId),
            amount: amount,
            deadline: deadline,
            maxApplicants: maxApplicants,
            currentApplicants: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            grantor: msg.sender,
            encryptedDescription: description
        });

        emit GrantCreated(grantId, msg.sender, 0); // Amount encrypted, so emit 0
    }

    /**
     * @dev Submit an application for a grant
     * @param grantId The grant ID to apply for
     * @param requestedAmount Encrypted requested amount
     * @param proposal Encrypted proposal description
     */
    function submitApplication(
        uint32 grantId,
        euint256 requestedAmount,
        string memory proposal
    ) external {
        require(grantId < nextGrantId, "Grant does not exist");
        
        // Check if application already exists
        require(applications[grantId][msg.sender].applicant == address(0), "Application already exists");
        
        // Create application with encrypted data
        applications[grantId][msg.sender] = Application({
            grantId: FHE.asEuint32(grantId),
            requestedAmount: requestedAmount,
            score: FHE.asEuint32(0), // Will be set during review
            isApproved: FHE.asEbool(false),
            applicant: msg.sender,
            encryptedProposal: proposal
        });

        // Add to user applications
        userApplications[msg.sender].push(FHE.asEuint32(grantId));

        emit ApplicationSubmitted(grantId, msg.sender);
    }

    /**
     * @dev Review and score an application (only grantor)
     * @param grantId The grant ID
     * @param applicant The applicant address
     * @param score Encrypted score (0-100)
     */
    function reviewApplication(
        uint32 grantId,
        address applicant,
        euint32 score
    ) external {
        require(grants[grantId].grantor == msg.sender, "Only grantor can review");
        require(applications[grantId][applicant].applicant != address(0), "Application does not exist");
        
        // Update application score
        applications[grantId][applicant].score = score;
    }

    /**
     * @dev Approve an application and transfer funds
     * @param grantId The grant ID
     * @param applicant The applicant address
     */
    function approveApplication(
        uint32 grantId,
        address applicant
    ) external nonReentrancy {
        require(grants[grantId].grantor == msg.sender, "Only grantor can approve");
        require(applications[grantId][applicant].applicant != address(0), "Application does not exist");
        
        // Mark application as approved
        applications[grantId][applicant].isApproved = FHE.asEbool(true);
        
        // Get the requested amount (this would need to be decrypted in a real implementation)
        // For demo purposes, we'll use a fixed amount
        uint256 approvedAmount = 1000 * 10**18; // 1000 tokens
        
        // Transfer tokens to applicant
        require(token.transfer(applicant, approvedAmount), "Transfer failed");
        
        emit ApplicationApproved(grantId, applicant, approvedAmount);
    }

    /**
     * @dev Fund a grant with tokens
     * @param grantId The grant ID
     * @param amount The amount to fund
     */
    function fundGrant(uint32 grantId, uint256 amount) external {
        require(grantId < nextGrantId, "Grant does not exist");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        emit GrantFunded(grantId, amount);
    }

    /**
     * @dev Close a grant
     * @param grantId The grant ID
     */
    function closeGrant(uint32 grantId) external {
        require(grants[grantId].grantor == msg.sender, "Only grantor can close");
        
        grants[grantId].isActive = FHE.asEbool(false);
        
        emit GrantClosed(grantId);
    }

    /**
     * @dev Get grant information (returns encrypted data)
     * @param grantId The grant ID
     */
    function getGrant(uint32 grantId) external view returns (Grant memory) {
        require(grantId < nextGrantId, "Grant does not exist");
        return grants[grantId];
    }

    /**
     * @dev Get application information (returns encrypted data)
     * @param grantId The grant ID
     * @param applicant The applicant address
     */
    function getApplication(uint32 grantId, address applicant) external view returns (Application memory) {
        require(applications[grantId][applicant].applicant != address(0), "Application does not exist");
        return applications[grantId][applicant];
    }

    /**
     * @dev Get user's applications
     * @param user The user address
     */
    function getUserApplications(address user) external view returns (euint32[] memory) {
        return userApplications[user];
    }

    /**
     * @dev Emergency withdrawal function
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Transfer failed");
    }
}
