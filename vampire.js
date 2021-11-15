class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  isEqual(vampire)
  {
    if (this.name !== vampire.name)
    {
      return false;
    }
    if (this.yearConverted !== vampire.yearConverted)
    {
      return false;
    }
    if (this.creator !== vampire.creator)
    {
      return false;
    }
    for (let i = 0; i < this.offspring.length; i ++)
    {
      if (!this.offspring[i].isEqual(vampire.offspring[i]))
      {
        return false;
      }
    }
    return true;
  }

  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal()  {
    let distanceToOrigin = 0;
    let vampirePointer = this;
    while (vampirePointer.creator) {
      distanceToOrigin++;
      vampirePointer = vampirePointer.creator;
    }
    return distanceToOrigin;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal)

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vampirePointer1 = vampire;
    let vampirePointer2 = this;
    if (vampirePointer1.numberOfVampiresFromOriginal  === 0) {
      return vampirePointer1;
    }
    if (vampirePointer2.numberOfVampiresFromOriginal  === 0) {
      return vampirePointer2;
    }
    
    if (vampirePointer1.numberOfVampiresFromOriginal  === 1) {
      return vampirePointer1.creator;
    }
    if (vampirePointer2.numberOfVampiresFromOriginal  === 1) {
      return vampirePointer2.creator;
    }

    for (const vampKid of vampirePointer1.offspring)
    {
      if (vampKid.isEqual(vampirePointer2))
      {
        return vampirePointer1;
      }
    }

    for (const vampKid of vampirePointer2.offspring)
    {
      if (vampKid.isEqual(vampirePointer1))
      {
        return vampirePointer2;
      }
    }
    


    while (!vampirePointer1.creator.isEqual(vampirePointer2.creator) && vampirePointer1.numberOfVampiresFromOriginal > 1 && vampirePointer2.numberOfVampiresFromOriginal>1) {
      // console.log(vampirePointer2.creator.name,vampirePointer1.creator.name)
      while (vampirePointer1.numberOfVampiresFromOriginal  > vampirePointer2.numberOfVampiresFromOriginal) {
        // console.log('1')
        vampirePointer1 = vampirePointer1.creator;
      }
      // console.log('asdf',vampirePointer1.numberOfVampiresFromOriginal  < vampirePointer2.numberOfVampiresFromOriginal)
      while (vampirePointer1.numberOfVampiresFromOriginal  < vampirePointer2.numberOfVampiresFromOriginal) {
        // console.log('1')
        vampirePointer2 = vampirePointer2.creator;
      }
      if (vampirePointer1.numberOfVampiresFromOriginal  === vampirePointer2.numberOfVampiresFromOriginal  && !(vampirePointer1.creator.isEqual( vampirePointer2.creator))) {
        vampirePointer1 = vampirePointer1.creator;
        vampirePointer2 = vampirePointer2.creator;
      }
      if (vampirePointer1.creator.isEqual(vampirePointer2.creator)) {
        return vampirePointer1.creator
      }
    }
    return vampire

  }
}


module.exports = Vampire;

