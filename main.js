// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

let currentDna = mockUpStrand();
const pAequorFactory = (number, dnaBaseArr) => {
  return {
    specimen: number,
    dna: dnaBaseArr,
    mutate() {
      let randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA() {
      let specimen1 = this.dna;
      let specimen2 = currentDna;
      let score = 0;
      for (
        let specimenIndex = 0;
        specimenIndex < specimen1.length;
        specimenIndex++
      ) {
        for (
          let secSpecimen = 0;
          secSpecimen < specimen2.length;
          secSpecimen++
        ) {
          if (
            specimenIndex === secSpecimen &&
            specimen1[specimenIndex] === specimen2[secSpecimen]
          ) {
            score += 1;
          }
        }
      }
      console.log(
        `Specimen 1 and Specimen 2 have ${Math.floor(
          (100 / 15) * score
        )}% DNA in common`
      );
    },
    willLikelySurvive() {
      let dnaScore = 0;
      const survivedStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          dnaScore += 1;
        }
      }

      if (Math.floor((100 / 15) * dnaScore) > 60) {
        survivedStrand.push(this.dna);
      }
      return console.log(survivedStrand);
    },
  };
};

console.log(pAequorFactory(1, mockUpStrand()).willLikelySurvive());
console.log(pAequorFactory(2, mockUpStrand()).compareDNA());
