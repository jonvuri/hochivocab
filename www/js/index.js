// vocabList defined previously

var currentsearchterm = '';

var glassShown = true;
var starsOnly = false;

var content = document.querySelector('.content');
var searchicon = document.querySelector('.searchicon');
var clearsearchicon = document.querySelector('.clearsearchicon');
var searchfield = document.querySelector('#searchfield');

var stariconhide = document.querySelector('.stariconhide');
var stariconshow = document.querySelector('.stariconshow');
var staricononly = document.querySelector('.staricononly');

var rows = [];

// Add and remove CSS classes
function addClass(el, clss) {
    el.className += ' ' + clss;   
}

function removeClass(el, clss) {
    var elClass = ' ' + el.className + ' ';
    while (elClass.indexOf(' ' + clss + ' ') !== -1)
         elClass = elClass.replace(' ' + clss + ' ', '');
    el.className = elClass;
}

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.htmlFromVocabList();
        this.populateRowsArray();
        //this.filterVocabList('');
        this.restoreStarSetting();
        this.registerStarHandlers();
    },


    showGlass: function() {
        removeClass(clearsearchicon, "showicon");
        addClass(clearsearchicon, "hideicon");

        removeClass(searchicon, "hideicon");
        addClass(searchicon, "showicon");

        glassShown = true;
    },

    showClear: function() {
        removeClass(searchicon, "showicon");
        addClass(searchicon, "hideicon");

        removeClass(clearsearchicon, "hideicon");
        addClass(clearsearchicon, "showicon");

        glassShown = false;
    },


    focusSearch: function() {
        searchfield.focus();
    },

    clearSearch: function() {
        searchfield.value = '';
        app.filterVocabList('');
        app.showGlass();
    },


    restoreStarSetting: function() {
        var starSetting = window.localStorage.getItem("stars");

        if (starSetting === "hide") {
            app.toggleStarsHide();
        } else if (starSetting === "show") {
            app.toggleStarsShow();
        } else if (starSetting === "only") {
            app.toggleStarsOnly();
        } else { // Default
            app.toggleStarsShow();
        }
    },


    showStarIcons: function() {
        var starIcons = document.querySelectorAll('.starcontainer');
        var len = starIcons.length;
        var i;
        var starIcon;

        for (i = 0; i < len; ++i) {
            starIcon = starIcons[i];

            removeClass(starIcon, "hidecontainer");
            addClass(starIcon, "showcontainer");
        }
    },

    hideStarIcons: function() {
        var starIcons = document.querySelectorAll('.starcontainer');
        var len = starIcons.length;
        var i;
        var starIcon;

        for (i = 0; i < len; ++i) {
            starIcon = starIcons[i];

            removeClass(starIcon, "showcontainer");
            addClass(starIcon, "hidecontainer");
        }
    },


    toggleStarsHide: function() {
        // Change icon
        removeClass(stariconhide, "hideicon");
        addClass(stariconhide, "showicon");

        removeClass(stariconshow, "showicon");
        addClass(stariconshow, "hideicon");

        removeClass(staricononly, "showicon");
        addClass(staricononly, "hideicon");

        // Set preference
        window.localStorage.setItem("stars", "hide");

        // Show all items
        starsOnly = false;
        app.filterVocabList(currentsearchterm);

        // Hide star icons
        app.hideStarIcons();
    },

    toggleStarsShow: function() {
        // Change icon
        removeClass(stariconhide, "showicon");
        addClass(stariconhide, "hideicon");

        removeClass(stariconshow, "hideicon");
        addClass(stariconshow, "showicon");

        removeClass(staricononly, "showicon");
        addClass(staricononly, "hideicon");

        // Set preference
        window.localStorage.setItem("stars", "show");

        // Show all items
        starsOnly = false;
        app.filterVocabList(currentsearchterm);

        // Show star icons
        app.showStarIcons();
    },

    toggleStarsOnly: function() {
        // Change icon
        removeClass(stariconhide, "showicon");
        addClass(stariconhide, "hideicon");

        removeClass(stariconshow, "showicon");
        addClass(stariconshow, "hideicon");

        removeClass(staricononly, "hideicon");
        addClass(staricononly, "showicon");

        // Set preference
        window.localStorage.setItem("stars", "only");

        // Show only starred items
        starsOnly = true;
        app.filterVocabList(currentsearchterm);

        // Show star icons
        app.showStarIcons();
    },


    filterVocabList: function(searchterm) {
        currentsearchterm = searchterm;

        var i;
        var vocabItem;
        var match = false;
        var len = vocabList.length;

        for (i = 0; i < len; ++i) {
            vocabItem = vocabList[i];

            match = false;

            if (searchterm === '') {
                match = true;
            } else if (vocabItem) {
                if (vocabItem.chinese && vocabItem.chinese.indexOf(searchterm) !== -1)
                    match = true;
                else if (vocabItem.pinyin && vocabItem.pinyin.indexOf(searchterm) !== -1)
                    match = true;
                else if (vocabItem.english && vocabItem.english.indexOf(searchterm) !== -1)
                    match = true;
                else if (vocabItem.category && vocabItem.category.indexOf(searchterm) !== -1)
                    match = true;
                else if (vocabItem.examples && vocabItem.examples.indexOf(searchterm) !== -1)
                    match = true;
            }


            if (match) {
                if (starsOnly) {
                    if (window.localStorage.getItem("star" + i)) {
                        removeClass(rows[i], "hiderow");
                        addClass(rows[i], "showrow");
                    } else {
                        removeClass(rows[i], "showrow");
                        addClass(rows[i], "hiderow");
                    }
                } else {
                    removeClass(rows[i], "hiderow");
                    addClass(rows[i], "showrow");
                }
            } else {
                removeClass(rows[i], "showrow");
                addClass(rows[i], "hiderow");
            }
        }


/*
        var newList;

        if (searchterm === '') {
            newList = vocabList;
        } else {
            newList = vocabList.filter(function(val) {
                if (val) {
                    if (val.chinese && val.chinese.indexOf(searchterm) !== -1)
                        return true;

                    if (val.pinyin && val.pinyin.indexOf(searchterm) !== -1)
                        return true;

                    if (val.english && val.english.indexOf(searchterm) !== -1)
                        return true;

                    if (val.category && val.category.indexOf(searchterm) !== -1)
                        return true;

                    if (val.examples && val.examples.indexOf(searchterm) !== -1)
                        return true;
                }

                return false;
            });
        }

        content.innerHTML = this.htmlFromVocabList(newList);*/
    },

    htmlFromVocabList: function() {
        var html = '';
        var i;
        var curr;
        var starred;
        var len = vocabList.length;

        for (i = 0; i < len; ++i) {
            curr = vocabList[i];
            starred = window.localStorage.getItem('star' + i);

            html += '<div class="row" id="row' + i + '">';

            html += '<div class="starcontainer showcontainer"><div class="startable">';
            html += '<div class="star staroff ' + (starred ? 'hideicon' : 'showicon') + '"><i class="icon-star-empty"></i></div>';
            html += '<div class="star staron ' + (starred ? 'showicon' : 'hideicon') + '"><i class="icon-star"></i></div>';
            html += '</div></div>';

            html += '<ul>';

            if (curr.chinese)
                html += '<li><span class="chinese">' + curr.chinese + '</span></li>';

            if (curr.pinyin)
                html += '<li><span class="pinyin">' + curr.pinyin + '</span></li>';

            if (curr.english)
                html += '<li><span class="english">' + curr.english + '</span></li>';

            if (curr.category)
                html += '<li><span class="category">' + curr.category + '</span></li>';

            if (curr.examples)
                html += '<li><span class="examples">' + curr.examples + '</span></li>';

            html += '</ul></div>';
        }

        content.innerHTML = html;
    },


    populateRowsArray: function() {
        var i;
        var len = vocabList.length;

        for (i = 0; i < len; ++i) {
            rows[i] = document.querySelector('#row' + i);
        }
    },


    registerStarHandlers: function() {
        var i;
        var len = vocabList.length;

        for (i = 0; i < len; ++i) {
            (function(row, index) {
                var staroff = row.querySelector('.staroff');
                var staron = row.querySelector('.staron');

                staroff.addEventListener('click', function() {
                    window.localStorage.setItem('star' + index, 'starred');

                    removeClass(staroff, 'showicon');
                    addClass(staroff, 'hideicon');

                    removeClass(staron, 'hideicon');
                    addClass(staron, 'showicon');
                });

                staron.addEventListener('click', function() {
                    window.localStorage.setItem('star' + index, '');

                    removeClass(staron, 'showicon');
                    addClass(staron, 'hideicon');

                    removeClass(staroff, 'hideicon');
                    addClass(staroff, 'showicon');
                });
            })(rows[i], i);
        }
    },


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);

        var currentValue = '';

        searchfield.addEventListener('keyup', function() {
            var value = searchfield.value;
            if (value !== currentValue) {
                currentValue = value;

                if (value === '') {
                    if (!glassShown) {
                        app.showGlass();
                    }
                } else {
                    if (glassShown) {
                        app.showClear();
                    }
                }

                app.filterVocabList(value);
            }
        });

        stariconhide.addEventListener('click', this.toggleStarsShow);
        stariconshow.addEventListener('click', this.toggleStarsOnly);
        staricononly.addEventListener('click', this.toggleStarsHide);

        searchicon.addEventListener('click', this.focusSearch);
        clearsearchicon.addEventListener('click', this.clearSearch);
    }
};
