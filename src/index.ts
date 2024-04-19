import App  from "./app";

(async () => {
  const app = new App();
  await app.start();



  await new Promise((resolve, reject) => {
    setTimeout(async () => {
        await app.stop();
        resolve('done');
    }, 5000)
  })

  console.log('done');


})();