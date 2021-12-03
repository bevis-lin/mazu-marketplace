import { query, tx } from "@onflow/fcl";
import { useEffect, useReducer } from "react";
import { LIST_SENTIMENS } from "../flow/list-sentimens.script";
import { defaultReducer } from "../reducer/defaultReducer";
import SentimenClass from "../utils/SentimenClass";

export default function useSentimens() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: [],
  });

  useEffect(() => {
    const fetchSentimens = async () => {
      dispatch({ type: "PROCESSING" });

      try {
        const res = await query({
          cadence: LIST_SENTIMENS,
          args: (arg, t) => [arg(0, t.Int), arg(10, t.Int)],
        });

        let mappedSentimens = [];

        console.log(res);
        res.displayItems.forEach((element) => {
          let sentimen = new SentimenClass(
            element.metadata.cardID,
            element.metadata.name,
            element.metadata.description,
            element.metadata.imageUrl,
            element.metadata.data.activity
          );
          mappedSentimens.push(sentimen);
        });

        dispatch({ type: "SUCCESS", payload: mappedSentimens });
      } catch (err) {
        console.log(err);
        dispatch({ type: "ERROR" });
      }
    };

    fetchSentimens();
  }, []);

  return {
    ...state,
  };
}
