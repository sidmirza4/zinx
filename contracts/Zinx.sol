//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Zinx {
  struct Photo {
    string id;
    string photoHash;
    string authorName;
    address author;
    string description;
    uint totalDonation;
  }

  event Donate (
    string id,
    address receiver,
    uint amount,
    address donator
  );

  mapping(string => Photo) public photos;

  function uploadPhoto(string memory id, string memory photoHash, string memory authorName, string memory description) public {
    require(bytes(id).length > 0, "Please provide a photo id");
    require(bytes(photoHash).length > 0, "Photo hash is not valid");
    
    photos[id] = Photo({
      id: id,
      photoHash: photoHash,
      authorName: authorName,
      author: msg.sender,
      description: description,
      totalDonation: 0
    });
  }

  function getPhotoBy(string memory id) public view returns (Photo memory photo) {
    return photos[id];
  }

  function donate(string memory id, uint amount) public payable {
    // Throwing an  error is balance is not sufficient
    require(msg.sender.balance > amount, "Insufficient Balance");

    // Checking if id is correct
    require(bytes(id).length > 0, "Please provide a photo id");
    
    // getting the photo data from the `photos` mapping
    address receiver = photos[id].author;

    // throwing an error if user is trying to send money to himself
    require(msg.sender != receiver, "You cannot donate to yourself");

    // updating donated amount
    photos[id].totalDonation += msg.value;

    console.log("Donating %s amount to %s", msg.value, receiver);

    // emitting donate event
    emit Donate(id, receiver, msg.value, msg.sender);
  }
}
