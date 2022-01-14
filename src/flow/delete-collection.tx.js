export const DELETE_COLLECTION = `
  import Sentimen from 0xSentimen
  import SentimenPack from 0xPack

  transaction() {
    prepare(acct: AuthAccount) {

      if acct.borrow<&Sentimen.Collection>(from: /storage/sentimenCollection) != nil {
        let collectionRef <- acct.load<@Sentimen.Collection>(from: /storage/sentimenCollection)
          ?? panic("Could not borrow collection reference")
        destroy collectionRef
        acct.unlink(/public/sentimenCollection)
      }

      if acct.borrow<&SentimenPack.Collection>(from: /storage/sentimenPackCollection) != nil {
        let packCollectionRef <- acct.load<@SentimenPack.Collection>(from: /storage/sentimenPackCollection)
          ?? panic("Could not borrow pack collection reference")
        destroy packCollectionRef
        acct.unlink(/public/sentimenPackCollection)
      }

    }
  }
`;
