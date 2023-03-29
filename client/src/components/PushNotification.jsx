import { Notifications } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { createClient } from "graphql-ws";
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from "../utils/constant";
import { Badge, Menu, MenuItem } from "@mui/material";

const client = createClient({
  url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});
const query = `subscription PushNotification {
  notification {
    message
  }
}`;
const PushNotification = () => {
  const [isvisible, setInvisible] = useState(true);

  const [notification, setNotification] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    setNotification("");
    setInvisible(true);
  };

  const handleClick = (e) => {
    if (notification) {
      setAnchorEl(e.currentTarget);
    }
  };

  useEffect(() => {
    // subscription
    (async () => {
      const onNext = ({ data }) => {
        setInvisible(false);

        const message = data?.notification?.message;

        setNotification(message);
        console.log("[PUSH_NOTIFICATION]", { data });
      };
      await new Promise((resolve, reject) => {
        client.subscribe(
          {
            query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);
  return (
    <>
      <Badge color="error" variant="dot" invisible={isvisible}>
        <Notifications onClick={handleClick} sx={{ ml: 1 }} />
      </Badge>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  );
};

export default PushNotification;
