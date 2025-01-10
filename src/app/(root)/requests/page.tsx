"use client";
import React from "react";
import { Request } from "./request";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

type Props = {};

const RequestsPage = (props: Props) => {
  const requests = useQuery(api.request.get);
  console.log(requests);
  return (
    <div>
      {requests ? (
        requests.length === 0 ? (
          <p>No requests found</p>
        ) : (
          requests.map((request) => {
            return (
              <Request
                key={request.request.receiver}
                id={request.request._id}
                imgUrl={request.sender.imageUrl}
                userName={request.sender.username}
                email={request.sender.imageUrl}
              />
            );
          })
        )
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default RequestsPage;
