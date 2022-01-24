import { assert, expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Zinx", function () {
  let Zinx;
  let zinx: Contract;
  let accounts: any[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    Zinx = await ethers.getContractFactory("Zinx");
    zinx = await Zinx.deploy();
    await zinx.deployed();
  });

  it("Should be deployed", async function () {
    assert(zinx);
    const photoCount = await zinx.photoCount();
    expect(photoCount).equal(0);
  });

  describe("Photos", function () {
    const newPhoto = {
      photoHash: "This is the photohash",
      authorName: "This is author name",
      description: "This is the description",
    };

    this.beforeEach(async function () {
      await zinx.uploadPhoto(
        newPhoto.photoHash,
        newPhoto.authorName,
        newPhoto.description
      );
    });

    it("should be uploaded", async function () {
      const photoCount = await zinx.photoCount();
      expect(photoCount).equal(1);
    });

    it("should be returned by id", async function () {
      const firstPhoto = await zinx.photos(1);
      expect(firstPhoto.photoHash).to.equal("This is the photohash");
      expect(firstPhoto.authorName).to.equal("This is author name");
      expect(firstPhoto.description).to.equal("This is the description");
      expect(firstPhoto.author).to.equal(accounts[0].address);
      expect(firstPhoto.totalDonation).to.equal(0);
    });

    it("should accept donation", async function () {
      // revert if owner is sending ether to himself
      expect(zinx.donate(1, 10)).to.be.revertedWith(
        "You cannot donate to yourself"
      );

      // making donation from addr2
      await zinx.connect(accounts[1]).donate(1, 10);

      // making the transfer
      // const photo = await zinx.photos(1);
      // expect(photo.totalDonation.toNumber()).to.equal(10);
    });
  });
});
