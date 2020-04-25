

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),

    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),

    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),

    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),

    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };


  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

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

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors';

  const generateTitleLinks = function (customSelector = '') {

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles){
      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();

  const calculateTagsParams = function (tags) {
    const params = {max: 0, min: 999999};
    for (let tag in tags){
      if (tags[tag] > params.max){
        params.max = tags[tag];
      }
      if (tags[tag] < params.min){
        params.min = tags[tag];
      }
    }

    return params;

  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count -params.min;
    const normalizedMax = params.max - params.min;
    const  percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1 );
    return classNumber;
  };

  const calculateAuthorParams = function (authors) {
    const params = {max: 0, min: 999999};
    for (let author in authors){
      if (authors[author] > params.max){
        params.max = authors[author];
      }
      if (authors[author] < params.min){
        params.min =authors[author];
      }
    }
    return params;
  };

  const calculateAuthorClass = function (count, params) {
    const normalizedCount = count -params.min;
    const normalizedMax = params.max - params.min;
    const  percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1 );
    return classNumber;
  };

  function generateTags(){
    let allTags = {};   /* [NEW] create a new variable allTags with an empty array */
    const articles = document.querySelectorAll('.post');     /* [DONE] find all articles */
    for (let article of articles){        /* [DONE] START LOOP: for every article: */
      const wrapper = article.querySelector(optArticleTagsSelector);  /* [DONE] find tags wrapper */
      let html = '';       /* [DONE] make html variable with empty string */
      const articleTags = article.getAttribute('data-tags');       /* [DONE] get tags from data-tags attribute */
      const articleTagsArray = articleTags.split(' ');       /* [DONE] split tags into array */
      for (let tag of articleTagsArray){        /* [DONE] START LOOP: for each tag */
        const linkHTMLData = {tag: tag, name: tag};          /* [DONE] generate HTML of the link */
        const linkHTML = templates.articleTag(linkHTMLData);
        html = html + linkHTML;          /* [DONE] add generated code to html variable */
        if (!allTags[tag]){          /* [NEW] check if this link is NOT already in allTags */
          allTags[tag] = 1;            /* [NEW] add tag to allTags object */
        }else{            /* [DONE] add generated code to allTags array */
          allTags[tag]++;
        }          /* [DONE] END LOOP: for each tag */
      }
      wrapper.innerHTML = html;        /* [DONE] insert HTML of all the links into the tags wrapper */
    }      /* [DONE] END LOOP: for every article: */
    const tagList = document.querySelector(optTagsListSelector);     /* [DONE] find list of tags in right column */
    const tagsParams = calculateTagsParams(allTags);


    let allTagsData = {tags: []};      /* [NEW] create variable for all links HTML code */
    for (let tag in allTags){      /* [NEW] START LOOP: for each tag in allTags: */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        ClassName: calculateTagClass(allTags[tag], tagsParams)
      });

      // allTagsHTML += '<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag +'</a></li> ';        /* [NEW] generate code of a link and add it to allTagsHTML */
    }        /* [NEW] END LOOP: for each tag in allTags: */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  generateTags();

  function tagClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* [IN PROGRESS] find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* [DONE] START LOOP: for each active tag link */
    for (let activeLink of activeLinks){
      /* [DONE] remove class active */
      activeLink.classList.remove('active');
      /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* [DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks){
      /* [DONE] add class active */
      tagLink.classList.add('active');
      /* [DONE] END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll('.post-tags a, .tags a');
    /* START LOOP: for each link */
    for (let link of links){
      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }
    /* [DONE] END LOOP: for each link */
  }

  addClickListenersToTags();

  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll('.post');
    const articleList = document.querySelector(optAuthorsListSelector);
    for (let article of articles){
      const wrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthors = article.getAttribute('data-author');
      const linkHTMLData = {author: articleAuthors, name: articleAuthors};
      const linkHTML = templates.articleAuthor(linkHTMLData);
      html = html + linkHTML;
      if (!allAuthors[articleAuthors]){
        allAuthors[articleAuthors] = 1;
      }else{
        allAuthors[articleAuthors]++;
      }
      wrapper.innerHTML = html;
    }
    const authorParams = calculateAuthorParams(allAuthors);
    let allAuthorsData = {authors: []};
    for (let author in allAuthors){
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorClass(allAuthors[author], authorParams)
      });

      //allAuthorsHTML += '<li><a class="' + optCloudClassPrefix + calculateAuthorClass(allAuthors[author], authorParams) + '" href="#author-' + author + '">' + author +'</a></li> ';
    }
    articleList.innerHTML = templates.authorCloudLink(allAuthorsData);
    console.log(allAuthorsData);
  }

  generateAuthors();

  const authorClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    console.log(author);
    const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(authorLinks);
    for (let authorLink of authorLinks){
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {
    const links = document.querySelectorAll('.post-author a, .authors a');
    for (let link of links){
      link.addEventListener('click', authorClickHandler);
    }

  };

  addClickListenersToAuthors();
}
