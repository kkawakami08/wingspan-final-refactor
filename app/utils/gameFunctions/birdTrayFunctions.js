export const refillTray = (birdTray, birdDeck, setBirdTray) => {
  let newTray = [];
  for (let i = birdTray.length; i < 3; i++) {
    newTray.push(birdDeck.pop());
  }
  setBirdTray((tray) => {
    tray.push(...newTray);
    return tray;
  });
};
