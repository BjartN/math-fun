(function(){        

    var cells = 4;
    var score = 0;

    function init(){
        var n = numbers();

        $.each($('.sum'), function(){
            $(this).focus().val('')       
        });

        $.each($('.overflow input'), function(){
            $(this).focus().val('')       
        });

        range(cells).forEach(function(e,i){
            $('#cell-1-'+i).html(i>=len(n.a) ? '' :  numAt(n.a,i));
        });

        range(cells).forEach(function(e,i){
            $('#cell-2-'+i).html(i>=len(n.b) ? '' :numAt(n.b,i));
        });

        $('input').unbind('keyup');
        $('input').keyup(function(){
            validate(n,this);
        });
    }

    var info = 0;
    var isInt = /^\d+$/;

    function validate(n,curr){
        var good = true;
        var after = false;
        range(cells).forEach(function(e,i){

            var elm = $('#sum-'+i);
            var sum = isInt.test(elm.val()) ? parseInt(elm.val()) : 0;
            var correct = numAt(n.a + n.b, i)
            var remainder = (numAt(n.a,i) + numAt(n.b,i))>9
            var isCurr = elm.get(0)==curr;

            if(sum==correct){
                $('#cell-0-'+(i+1)).val(remainder ? 1 : '')
                elm.css('background-color','lightblue')

                    //focus curr
                    if(isCurr){
                        $('#sum-'+(i+1)).focus();
                    }
                }
                else{
                    good=false;
                    $('#cell-0-'+(i+1)).val('');
                    elm.css('background-color','pink')
                }

                if(after){
                    elm.css('background-color','white') 
                    elm.val('')                   
                }

                if(isCurr)
                    after=true;

            });

        if(good){

            var s= Math.min(score+=7, 100);
            $('.score').html(s + '%');
            $('.score').css('width', s + '%')
            init();

        }
    }

    function numbers(){
        return {a:randInt(),b:randInt()};
    }

    function randInt(){
        return Math.floor( Math.random()*1000);
    }

    function toNum(a){
        var sum =0;
        for(var i=a.length-1; i>0; i--){
            sum+= (a[i] * Math.pow(10,i));
        }
        return sum;
    }

    function len(num){
        return (num + '').length;
    }

    function numAt(num,i){
        var s = num + '';

        if(i>=s.length)
            return 0;

        return parseInt(s.charAt(s.length-1-i));
    }

    function range(n){
        var a = [];
        for(var i=0; i<n; i++)
            a.push(i);
        return a;
    }

    init();
})();