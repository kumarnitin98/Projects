const apiKey = "BHRYp5AarV1lAjt3_f0F06jbbEQQhrCtt6b6XDhhN2U";
const formElement = document.getElementById("search-form");
const inputElement = document.getElementById("search-box");
const resultElement = document.getElementById("search-result");
const moreButtonElement = document.getElementById("show-more-btn");

const createImageSearch = (apiKey, formElem, inputElem, resultElem, moreBtnElem) => {
    let query = "";
    let currentPage = 1;

    function clearResults() {
        resultElem.innerHTML = "";
    }

    async function searchImages() {
        query = inputElem.value;
        const itemsPerPage = 12;
        const apiUrl = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${query}&client_id=${apiKey}&per_page=${itemsPerPage}`;

        try {
            const response = await fetch(apiUrl);
            const searchData = await response.json();

            if (currentPage === 1) {
                clearResults();
            }

            const searchResults = searchData.results;
            searchResults.forEach(result => {
                const imgElement = document.createElement("img");
                imgElement.src = result.urls.small;
                const linkElement = document.createElement("a");
                linkElement.href = result.links.html;
                linkElement.target = "_blank";
                linkElement.appendChild(imgElement);
                resultElem.appendChild(linkElement);
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    formElem.addEventListener("submit", (e) => {
        e.preventDefault();
        currentPage = 1;
        searchImages();
    });

    moreBtnElem.addEventListener("click", () => {
        currentPage++;
        searchImages();
    });

    function startSearch(newQuery) {
        inputElem.value = newQuery;
        currentPage = 1;
        searchImages();
    }

    return {
        startSearch,
    };
};

const imageSearch = createImageSearch(apiKey, formElement, inputElement, resultElement, moreButtonElement);
