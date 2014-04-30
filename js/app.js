jQuery(document).ready(function($) {

    // function isThisStringAPalindrome( string )
    // returns
    //      true for palindrome
    //      false for not a palindrome
    //      null for empty string
    var isThisStringAPalindrome = function( strng ) {
        // simplify the string by making all characters lower case,
        // and removing all non-alphanumeric characters
        // e.g. "This isn't a palindrome 4 sure." becomes
        // "thisisntapalindrome4sure"
        var simplifiedString = strng.toLowerCase().replace(/\W+/g,'');

        // for empty string isPalindrome is set to null
        if ( '' === simplifiedString ) {
            return null;
        }

        return ( simplifiedString === simplifiedString.split('').reverse().join('') );
    };

    var stringModel = Backbone.Model.extend({
        defaults: {
            value: '',
            isPalindrome: null
        },

        // method checks if current value is a palindrome and updates
        // isPalindrome to true, false, or null (for empty string)
        updateIsPalindrome: function() {
            this.set( {
                isPalindrome: isThisStringAPalindrome( this.get("value") )
            });
        }
    });

    var PalindromeCheckerView = Backbone.View.extend({
        el: $('body'), // attaches `this.el` to an existing element.

        events: {
            'change input#string-input-for-palindrome': 'updateViewState'
        },

        initialize: function(){
            _.bindAll(this, 'render', 'updateViewState'); // fixes loss of context for 'this' within methods

            this.viewState = new stringModel();

            // when the model value is updated, check if it is a palindrome
            this.viewState.on('change:value', this.viewState.updateIsPalindrome);
            // when isPalindrome updated, render result
            this.viewState.on('change:isPalindrome', this.render);

        },

        updateViewState: function(e) {
            // update string value in the model
            this.viewState.set({
                'value': $('#string-input-for-palindrome').val()
            });
        },

        render: function(){
            var alertHtml,
                isPalindrome = this.viewState.get( 'isPalindrome' );

            if ( null === isPalindrome ) {
                alertHtml = '';
            } else if ( isPalindrome ) {
                alertHtml = '<div class="alert alert-success">This is a palindrome</div>';
            } else {
                alertHtml = '<div class="alert alert-danger">This is NOT a palindrome</div>';
            }
            $('#palindrome-status').html( alertHtml );
        }
    });

    var palindromeCheckerView = new PalindromeCheckerView();
});
