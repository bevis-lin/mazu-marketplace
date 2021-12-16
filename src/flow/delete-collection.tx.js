export const DELETE_COLLECTION = `
  import MonsterContract from 0xMonsterContract

  transaction() {
    prepare(acct: AuthAccount) {
      let collectionRef <- acct.load<@MonsterContract.Collection>(from: MonsterContract.CollectionStoragePath)
        ?? panic("Could not borrow collection reference")
      destroy collectionRef
      acct.unlink(MonsterContract.CollectionPublicPath)
    }
  }
`;
