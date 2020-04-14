/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
});
 */

{

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('link was clicked');

        /* [DONE] remove class 'active' from all article links */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute('href');
        console.log(articleSelector);
        console.log('clickedElement: ', clickedElement);


        /* [DONE] add class 'active' to the clicked link */

        clickedElement.classList.add('active');

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);
        console.log(targetArticle);

        /* [DONE] add class 'active' to the correct article */

        targetArticle.classList.add('active');

    }

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }


    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    const generateTitleLinks = function () {

        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        console.log(titleList)
        titleList.innerHTML = '';


        /* [DONE] for each article */

        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);

        for (let article of articles){
            /* [DONE] get the article id */

            const articleId = article.getAttribute('id');
            console.log(articleId);
        }


        /* [IN PROGRESS] find the title element */

        /* get the title from the title element */

        /* create HTML of the link */

        /* insert link into titleList */

    }

    generateTitleLinks();

}