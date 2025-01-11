//event listener to know what the user has selected from dropdown
breedSelect.addEventListener("change", retrieveBreed);

//Retrieve information and images on the selected breed from the cat API using fetch().
async function retrieveBreed(breedID) {
  //this section is for breed details, haven't used it yet
  Carousel.clear(); //clears the existing images and info
  try {
    const selectedBreed = breedSelect.value;
    // console.log("Selected value:", selectedBreed);
    let breedURL = "https://api.thecatapi.com/v1/breeds/" + selectedBreed;
    const responseBreed = await fetch(breedURL, {
      headers: {
        "x-api-key":
          "live_NabEGs4pVZcSYNR1VA4zejo8v93fn1tLUWg948UpGnxjDTGoTTZFXqnbvJKzV87x",
      },
    });
    // console.log(breedURL);
    const dataBreed = await responseBreed.json();
    breedDetail = dataBreed;

    // this section is to fetch 10 images of the selected breed
    let previousImgID = ""; //this is to check if consecutive images are same if so break out of loop

    for (let i = 0; i < 11; i++) {
      let breedImageURL =
        "https://api.thecatapi.com/v1/images/search?breed_ids=" + selectedBreed; //creating url using
      const responseImage = await fetch(breedImageURL, {
        headers: {
          "x-api-key":
            "live_NabEGs4pVZcSYNR1VA4zejo8v93fn1tLUWg948UpGnxjDTGoTTZFXqnbvJKzV87x",
        },
      });

      const dataImage = await responseImage.json();
      const url = dataImage[0].url;
      const imageID = dataImage[0].id;
      if (imageID === previousImgID) break; //if two images are the same then end loop
      previousImgID = imageID;
      const imgAlt = "Image of " + dataImage[0].breeds[0].name;

      const imageItem = Carousel.createCarouselItem(url, imgAlt, imageID);
      Carousel.appendCarousel(imageItem);
    }

    Carousel.start();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}