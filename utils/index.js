export const showNotification = (msg) => {
  notifications.show(msg, {
    autoHideDuration: 5000,
  });
};
