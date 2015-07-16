function showSearchResult(result) {
    var products = result.products, productsView = '',
        news = result.news, newsView = '',
        pages = result.pages, pagesView = '',
        resultCount = 0,
        suggestion = [],
        $autoComplete = $('#search_input_autocomplete'),
        autoComplete = '',
        $searchInput = $('#search_input'),
        search = $searchInput.val(),
        message = '',
        siteUrl = $('meta[name=site_url]').attr('content');

    if (products) {
        resultCount += products.length;

        products.forEach(function (product) {
            suggestion = suggestion.concat(product.name.toLowerCase().split(" "));

            productsView += '<div class="product">'
                + '    <a href="' + siteUrl + '/products/show_product/' + product.id + '">'
                + '        <div class="product-img">'
                + '            <div class="product-photo">'
                + '                <img src="' + siteUrl + '/images/products/' + product.outer_image + '"alt="">'
                + '            </div>'
                + '        </div>'
                + '        <div class="sort">' + product.sort + '</div>'
                + '        <div class="title">' + product.name + '</div>'
                + '    </a>'
                + '</div>'
        });

        productsView = '<div class="container result-block-title">Продукція</div>'
            + '<div class="products-page">'
            + '    <section>'
            + '        <div class="container">'
            + '            <div class="products-category-container">'
            + '                <div class="products">'
            + productsView
            + '                </div>'
            + '            </div>'
            + '        </div>'
            + '    </section>'
            + '</div>'

    }

    if (news) {
        resultCount += news.length;

        news.forEach(function (newsItem) {

            var itemCategories = newsItem.categories.map(function (elem) {
                return elem.category_name;
            }).join(" ");

            suggestion = suggestion.concat(newsItem.name.toLowerCase().split(" "));

            newsView += '<a href="' + siteUrl + '/news/show/' + newsItem.id + '">'
                + '<div class="column show">'
                + '<div class="news-block-item">'
                + '    <div class="v-align-wrapper">'
                + '        <div class="v-align">'
                + '            <div>' + itemCategories + '</div>'
                + '            <div class="date">' + newsItem.date_added + '</div>'
                + '            <div class="title">' + newsItem.name + '</div>'
                + '        </div>'
                + '    </div>'
                + '</div>'
                + '</div>'
                + '</a>'
        });

        newsView = '<div class="container result-block-title">Новини</div>'
            + '<div class="news-page">'
            + '    <section>'
            + '        <div class="container">'
            + '            <div class="news-block columns-3">'
            + newsView
            + '            </div>'
            + '        </div>'
            + '    </section>'
            + '</div>'

    }
    if (pages) {
        resultCount += pages.length;

        pages.forEach(function (page) {
            suggestion = suggestion.concat(page.name.toLowerCase().split(" "));
            suggestion = suggestion.concat(page.words_for_search.toLowerCase().split(" "));
            pagesView += '<div><a href="' + page.href.replace('/index', '') + '">' + page.name + '</a></div>'
        });

        pagesView = '<div class="container result-block-title">Сторінки</div>'
            + '<div class="container pages-found">'
            + pagesView
            + '</div>'
    }

    var s = search.split(" "),
        l = s.length;

    for (var i = 0; i < suggestion.length; i++) {
        if (suggestion[i].indexOf(s[l - 1]) == 0 && s[l - 1].length > 1) {
            s[l - 1] = suggestion[i];
            autoComplete = s.join(" ");
            break;
        }
    }

    $autoComplete.val(autoComplete);

    $('#content').hide();
    $('.search-result-wrapper').removeClass('hide').addClass('show');

    if (resultCount > 0) {

        if (result.full_search) {
            message = '<div class="container result-message">кількість результатів пошуку для <span>'
                + search + '</span>: ' + resultCount + '</div>';
        } else {
            message = '<div class="container result-message">кількість результатів попереднього пошуку для <span>'
                + search + '</span>: ' + resultCount
                + '<div>Для детального пошуку натисніть клавішу Enter</div></div>';
        }

        $('#search-result-wrapper').html(
            message + productsView + newsView + pagesView
        );

        resizeElements();
    } else {

        if (result.full_search) {
            message = '<div class="container result-message">Пошук <span>'
                + search + '</span> не дав результатів</div>';
        } else {
            message = '<div class="container result-message">Попередній пошук <span>'
                + search + '</span> не дав результатів'
                + '<div>Для детального пошуку натисніть клавішу Enter</div></div>';
        }

        $('#search-result-wrapper').html(message);
        $autoComplete.val('');
    }
}

$(document).ready(function () {
    var $searchInput = $('#search_input'),
        $autoComplete = $('#search_input_autocomplete');

    function openSearch() {
        $(
            '.main-menu,' +
                '.menu-button,' +
                '.filter-button,' +
                '.products-filter'
        ).removeClass('open').addClass('close');
        $('.search-wrapper').addClass('show').removeClass('hide');
    }

    function closeSearch() {
        $('.search-wrapper').addClass('hide').removeClass('show');
        $('#content').show();
        $('.search-result-wrapper').html('').removeClass('show').addClass('hide');
        $autoComplete.val('Пошук');
        $searchInput.val('');
        resizeElements();
    }

    $('.close-search').on('click', function(){
        closeSearch()
    });
    $('.open-search').on('click', function(){
        if(!$('.search-wrapper').hasClass('show')){
            openSearch();
        } else closeSearch();
    });

    $searchInput.on('focusin', function () {
        if ($(this).val().length == 0) {
            $autoComplete.val('');
        }
    });

    $searchInput.on('focusout', function () {
        if ($(this).val().length == 0) {
            $autoComplete.val('Пошук');
        }
    });

    $searchInput.keyup(function (e) {
        if (e.keyCode == 39 && $autoComplete.val() != '') {
            $(this).val($autoComplete.val());
        }

        var data = {
            search: $(this).val()
        };

        if (e.keyCode == 13) {
            data = {
                search: $(this).val(),
                full_search: true
            };
        }

        if ($(this).val().length >= 2) {
            $.ajax({
                url: $('meta[name=site_url]').attr('content') + '/search',
                type: "POST",
                data: data,
                success: function (resp) {
                    showSearchResult(resp);
                },
                dataType: "json"
            });
        } else {
            $autoComplete.val('');
            $('#content').show();
            $('.search-result-wrapper').html('').removeClass('show').addClass('hide');
            resizeElements();
        }
    });

});
