import { query } from "@onflow/fcl";
import { useEffect, useReducer } from "react";
import { GET_LISTINGS } from "../flow/get-listings.script";
import { GET_LISTINGS_BY_ACTIVITY } from "../flow/get-listings-by-activity.script";
import { defaultReducer } from "../reducer/defaultReducer";
import SentimenClass from "../utils/SentimenClass";
import { useParams } from "react-router-dom";

export default function useSentimens() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: [],
  });

  const { activityID } = useParams();

  useEffect(() => {
    const fetchSentimens = async () => {
      dispatch({ type: "PROCESSING" });

      try {
        var res;

        if (activityID) {
          res = await query({
            cadence: GET_LISTINGS_BY_ACTIVITY,
            args: (arg, t) => [
              arg(parseInt(activityID), t.UInt),
              arg(0, t.Int),
              arg(10, t.Int),
            ],
          });
        } else {
          res = await query({
            cadence: GET_LISTINGS,
            args: (arg, t) => [arg(0, t.Int), arg(10, t.Int)],
          });
        }

        let mappedSentimens = [];

        console.log(res);
        res.displayItems.forEach((element) => {
          let sentimen = SentimenClass.SentimenFactory(element);
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
