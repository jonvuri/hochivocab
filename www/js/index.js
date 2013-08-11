// vocabList defined previously

var glassShown = true;

var content = document.querySelector('.content');
var glass = document.querySelector('#glass');
var clear = document.querySelector('#clear');
var searchfield = document.querySelector('#searchfield');

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.filterVocabList('');
    },

    showGlass: function() {
        clear.style.display = "none";
        glass.style.display = "block";
        glassShown = true;
    },

    showClear: function() {
        glass.style.display = "none";
        clear.style.display = "block";
        glassShown = false;
    },

    clearSearch: function() {
        searchfield.value = '';
        app.filterVocabList('');
        app.showGlass();
    },

    filterVocabList: function(searchterm) {
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

        content.innerHTML = this.htmlFromVocabList(newList);
    },

    htmlFromVocabList: function(list) {
        var html = '';
        var i;
        var curr;
        var len = list.length;

        for (i = 0; i < len; ++i) {
            curr = list[i];

            html += '<div class="row" id="row' + i + '"><ul>';

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

        return html;
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

        var icons = document.querySelectorAll('.searchicon');
        icons[0].addEventListener('click', this.clearSearch);
        icons[1].addEventListener('click', this.clearSearch);
    }
};
