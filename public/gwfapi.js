//DECLARE GLOBALS
//unchanging vars
const baseURL = "https://admin.thegreenwebfoundation.org/api/v3/greencheck/";
//changing vars 
let displayResultsDiv = document.querySelector('.displayResultsDiv');
let introResultsPara = document.getElementById("introResults");
let urlSearchForm = document.getElementById("urlSearchForm");
let resultsList = document.getElementById("resultsList");
let liName = document.getElementById("name");
let liHost = document.getElementById("host");
let liGreen = document.getElementById("green");
let imageTrue = document.getElementById("imagetrue");
let imageFalse = document.getElementById("imagefalse")
    // imageTrue.style.display = "none";
    // imageFalse.style.display = "none";


//ADD EVENT LISTENERS TO FORM OR FORM BUTTON
//urlSearchForm.addEventListener('submit', fetchResults);
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", fetchResults);

//MAIN FUNC
function fetchResults(event) {
    event.preventDefault();
    let appendURL = document.querySelector("#searchBox").value;
    let finalURL = baseURL + appendURL;
    fetch(finalURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.data);
            introResultsPara.innerHTML = `The url ${appendURL} recieves the following rating from Green Web Foundation:`;
            liName.innerHTML = `URL name <br> ${data.url}`;
            liHost.innerHTML = `<br> Hosted by <br> ${data.hostedby}`;
            liGreen.innerHTML = `<br> Is this website and webhost green? <br> ${data.green}`;
            if (data.data === false) {
                resultsList.style.color = "whitesmoke"
                    //resultsList.style.display = "none"
                imageTrue.src = " "
                imageFalse.src = " "
                liGreen.innerHTML = `<br> Is this website and webhost green? <br> unknown`;
                introResultsPara.innerHTML = "There was an error fetching your request. A couple things could be happening. <br><br> 1) Check that the spelling of your URL is correct. <br> 2) Green Web Foundations does not have all website urls in their database - especially newer sites with low traffic. <br><br> Fix the spelling or test a more well known site. ";
            } else if (data.data === true) {
                resultsList.style.display = "true"
                imageFalse.style.display = "true";
                imageTrue.style.display = "true";
                if (data.green === true) {
                    resultsList.style.display = "true"
                    resultsList.style.color = "teal"
                    imageFalse.src = " "
                    imageTrue.src = "true.png"
                        //imageTrue.style.display = "true"
                        //imageFalse.style.display = "none"
                } else if (data.green === false) {
                    resultsList.style.display = "true"
                    resultsList.style.color = "red"
                    imageTrue.src = " "
                    imageFalse.src = "false.png"
                        //imageTrue.style.display = "none"
                        //imageFalse.style.display = "true"
                }
            }

        })
        .catch(function(e) {
            console.error(e);
            introResultsPara.innerHTML = "There was an error fetching your request. A couple things could be happening. <br><br> 1) Check that the spelling of your URL is correct. <br> 2) Green Web Foundations does not have all website urls in their database - especially newer sites with low traffic. <br><br> Fix the spelling or test a more well known site. ";
            imageTrue.src = " "
            imageFalse.src = " "
        })

}