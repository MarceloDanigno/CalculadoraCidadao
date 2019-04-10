$(document).ready(function(){

    $('#Calcular').click(function(){
        calcula(false);
    });
    $('#VU').click(function(){
        calcula(true);
    });
    function valida(vf, s, t, vp){
        var pattfloatp = /^[+]?\d+(\.\d+)*?$/
        var pattfloat = /^[+-]?\d+(\.\d+)*?$/
        var pattpos = /^\d+[0-9]*?$/

        if(vf.match(pattfloatp) != null && s.match(pattfloat) != null && vp.match(pattfloatp) != null && t.match(pattpos) != null){
            return true;
        }
        return false;
    }

    function calcula(VU){
        var s = String($('#s').val()).replace(",",".");
        var t = String($('#t').val());
        var vp =String($('#vp').val()).replace(",",".");
        var vf = String($('#vf').val()).replace(",",".");
        var tipo = null;
        if(vf == "" && s != "" && t != "" && vp != ""){
            tipo = "vf";
            vf = "0";
        }else
        if(vf != "" && s == "" && t != "" && vp != ""){
            tipo = "s";
            s = "0";
        }else
        if(vf != "" && s != "" && t == "" && vp != ""){
            tipo = "t";
            t = "0";
        }else
        if(vf != "" && s != "" && t != "" && vp == ""){
            tipo = "vp"
            vp = "0";
        }
        console.log(tipo);
        if(valida(vf, s, t, vp)){
            vf = parseFloat(vf);
            vp = parseFloat(vp);
            s = parseFloat(s)/100;
            t = parseInt(t);
            var result = 0;
            switch(tipo){
                case "vf":
                    result = vp*Math.pow((1+s),t);
                    break;
                case "vp":
                    if(VU){
                        result = vf / (Math.pow(1+s,t) - 1);
                    }else{
                        result = vf / (Math.pow(1+s,t));
                    }
                    break;
                case "t":
                    console.log(Math.log(vf/vp)/Math.log(1+s));
                    result = Math.ceil(Math.log(vf/vp)/Math.log(1+s));
                    break;
                case "s":
                    result = (Math.pow(vf/vp, 1/t) -1)*100
                    break;
                default:
                    result = 0;
                    break;
            }
            console.log(result);
            if(tipo == null){
                $('#container').children('#error').hide().html("Você está com 4 variáveis, por favor retire uma delas!").show();
            }
            else{
                $('#'+tipo).val(String(result));
                $('#container').children('#error').hide().html();
            }
        }else{
            $('#container').children('#error').hide().html("Algum dos campos está inválido, por favor verificar!").show();
        }
    }
});
