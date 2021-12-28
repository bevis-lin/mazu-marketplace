import { mutate, tx } from '@onflow/fcl';
import { useTxs } from '../providers/TxProvider';
import { CREATE_MINT_REQUEST } from '../flow/create-mint-request.tx';

export default function useMintRequest(user) {
  const { addTx, runningTxs } = useTxs();

  const createMintRequest = async (templateId, salePrice) => {
    if (runningTxs) {
      alert(
        'Transactions are still running. Please wait for them to finish first.'
      );
      return;
    }

    try {
      let res = await mutate({
        cadence: CREATE_MINT_REQUEST,
        limit: 1000,
        args: (arg, t) => [arg(templateId, t.UInt64), arg(salePrice, t.UFix64)],
      });

      addTx(res);
      await tx(res).onceSealed();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return {
    createMintRequest,
  };
}
