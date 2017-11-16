const expect = require("chai").expect;
const helper = require("../controllers/helper.js");

describe("caloriesFromFat", function() {
  it("multiply int totalFat by 9", function() {
    expect(helper.caloriesFromFat(10)).to.equal(90);
  });

  it("multiply string totalFat by 9", function() {
    expect(helper.caloriesFromFat("10")).to.equal(90);
  });

  it("multiply 0 by 9", function() {
    expect(helper.caloriesFromFat(0)).to.equal(0);
  });

});

describe("percentDailyTotalFat", function() {
  it("find percentage of daily total fat from int", function() {
    expect(helper.percentDailyTotalFat(64)).to.equal(100);
  });

  it("find percentage of daily total fat from string", function() {
    expect(helper.percentDailyTotalFat("64")).to.equal(100);
  });

  it("find percentage of daily total fat from 0", function() {
    expect(helper.percentDailyTotalFat(0)).to.equal(0);
  });
});

describe("percentDailySatFat", function() {
  it("find percentage of daily sat fat from int", function() {
    expect(helper.percentDailySatFat(20)).to.equal(100);
  });

  it("find percentage of daily sat fat from string", function() {
    expect(helper.percentDailySatFat("20")).to.equal(100);
  });

  it("find percentage of daily sat fat from 0", function() {
    expect(helper.percentDailySatFat(0)).to.equal(0);
  });
});

describe("percentDailyChol", function() {
  it("find percentage of daily cholesterol from int", function() {
    expect(helper.percentDailyChol(300)).to.equal(100);
  });

  it("find percentage of daily cholesterol from string", function() {
    expect(helper.percentDailyChol("300")).to.equal(100);
  });

  it("find percentage of daily cholesterol from 0", function() {
    expect(helper.percentDailyChol(0)).to.equal(0);
  });
});

describe("percentDailySodium", function() {
  it("find percentage of daily sodium from int", function() {
    expect(helper.percentDailySodium(2400)).to.equal(100);
  });

  it("find percentage of daily sodium from string", function() {
    expect(helper.percentDailySodium("2400")).to.equal(100);
  });

  it("find percentage of daily sodium from 0", function() {
    expect(helper.percentDailySodium(0)).to.equal(0);
  });
});

describe("percentDailyTotalCarb", function() {
  it("find percentage of daily carbs from int", function() {
    expect(helper.percentDailyTotalCarb(300)).to.equal(100);
  });

  it("find percentage of daily carbs from string", function() {
    expect(helper.percentDailyTotalCarb("300")).to.equal(100);
  });

  it("find percentage of daily carbs from 0", function() {
    expect(helper.percentDailyTotalCarb(0)).to.equal(0);
  });
});

describe("percentDailyDietaryFiber", function() {
  it("find percentage of daily dietary fiber from int", function() {
    expect(helper.percentDailyDietaryFiber(25)).to.equal(100);
  });

  it("find percentage of daily dietary fiber from string", function() {
    expect(helper.percentDailyDietaryFiber("25")).to.equal(100);
  });

  it("find percentage of daily dietary fiber from 0", function() {
    expect(helper.percentDailyDietaryFiber(0)).to.equal(0);
  });
});