$.subjects = function(course){
	var arrSubjects={};
	var scope=''; // сфере деятельности
	
	if(course==1) {
		arrSubjects={ 
			1:{ name: 'Основы информационной безопасности. Организационноеи правовое обеспечениеинформационной безопасности.', hours:'147' },
			2:{ name: 'Аппаратные средства вычислительной техники. Сети и системы передачи информации. Информационные технологии.', hours:'139' },
			3:{ name: 'Программно-аппаратные средства защиты информации. Техническая защита информации. ', hours:'140' },
			4:{ name: 'Криптографические средства и методы защиты информации. ', hours:'130' },
			5:{ name: 'Итоговая аттестация.', hours:'4' }
		}
		
		scope='информационной безопасности';
	}
	$("tr.tr_course").remove();
	var x;
	if(!$.isEmptyObject(arrSubjects)){
		$.each(arrSubjects, function(i,val ) {
		if(val.name=='Итоговая аттестация.') x='<select  id="att" ><option selected="selected" value="1">удовл</option><option value="2">хорошо</option><option value="3">отлично</option></select>';
		else x='зачет';
		  $("#subjects_form").append("<tr class='tr_course' ><td>"+i+"</td><td>"+val.name+"</td><td>"+val.hours+"</td><td>"+x+"</td></tr>");
		});
	}
	
	$('#scope_form').val(scope);
};

//печать 
$.print = function(x){
	var id;
	var str;
	var error=0;
	
	
	
	$('form .for_'+x).each(function() {
		//вычисление id
		str=$(this).attr('id');		
		id=str.substr(0, $(this).attr('id').length - 5);
		if (!$(this).val() && id!='subjects'){
			
			error=1;
		}
		else{
			
			
			//для дисциплин
			if(id=='subjects'){
				$(this).clone().appendTo('.'+x+' .'+id);
			}
			else{	
				
				if($(this).hasClass("select") )
					 $('.'+x+' .'+id).html($('#'+str+' option:selected').html());
				else  
					//для atestation
					if(id=='atestation'){
						$('.'+x+' .'+id).html($(this).val()+' ('+$('#evaluation_form option:selected').html()+')');
					}
					else $('.'+x+' .'+id).html($(this).val());
			}		
		}
	});
	
	// если все поля заполнены
	if(!error){
		if(x=='diploma'){
			var printing_css='<style>\ span, .span{ display:block; margin-bottom:11px;font: 13.3333px Arial;}'
			+'.diploma{background-image:url(./background.png); background-size: 100%;width:1077px;height:756px;//padding-top:70px;margin-left:5px;}'
			+'.diploma .left, .diploma .right{width:45%; height:100%; float:left;margin-top:103px;height:653px;}'
			+'.diploma .right{padding-left: 60px;}'

			+'.diploma .reg_number{margin-left: 280px;margin-top: 585px; }'

			+'.diploma .surname_dat{margin-left: 200px;}'
			+'.diploma .name_dat{margin-left: 70px;display:inline }'
			+'.diploma .middlename_dat,.diploma .middlename_rod{margin-left: 10px; display:inline }'

			+'.diploma .date1{margin-left: 150px; display:inline;white-space: pre;}'
			+'.diploma .date2{display:inline;white-space: pre;margin-left: 64px;}'
			+'.diploma .date3{margin-left: 172px;white-space: pre;}'
			+'.diploma .name_inst{margin-left: 30px;line-height: 2;text-indent: 320px; padding: 0px;margin-top: -4px;    margin-bottom: 3px;}'
			+'.diploma .for_name_cours{padding-left:30px;margin-top: -2px;margin-bottom: 7px;}'
			+'.diploma .name_cours{display:inline;line-height: 2;text-indent: 20px;}'
			+'.diploma .prog{display:inline;margin-left: 18px;}'

			+'.diploma .surname_rod{margin-left: 140px; }'
			+'.diploma .name_rod{margin-left: 50px;display:inline  }'
			+'.diploma .scope{margin-left: 40px;margin-top:37px}'
			+'.diploma .s_y {margin-top:222px;margin-left: 70px;}'
			+'.diploma .sity{display:inline;padding-left:10px}'
			+'.diploma .year{display:inline;padding-left:95px}'
			
			+'@media print {'
			+'@page {size: landscape; margin:0;padding:0}}</style>';
		}
		else if(x=='attachment'){
			var printing_css='<style>\ span, .span{ display:block; margin-bottom:11px;font: 13.3333px Arial;}'
			
			+'.attachment{background-image:url(background1.jpg); background-size: 100%;width:538.5px;height:756px;padding-top: 46px;}'
			+'.attachment .number{margin-left:420px}'
			+'.attachment .surname{margin-left:60px;float:left; margin-top:95px}'
			+'.attachment .name, .attachment .middlename{ margin-top:95px;float:left;margin-left:6px;}'
			
			+'.attachment .educ{margin-top:173px;margin-left:300px;}'
			
			+'.attachment .date1{margin-left: 80px; float:left;white-space: pre;margin-top: 45px;}'
			+'.attachment .date2{float:left;white-space: pre;margin-left: 95px;margin-top: 45px;}'
			
			+'.attachment .name_inst{margin-top: 78px;margin-left: 56px;text-indent: 380px;line-height: 2.5;}'
			+'.attachment .name_cours{margin-top: 8px;margin-left: 56px;text-indent: 90px;line-height: 1.3;}'
			
			+'.attachment .atestation{margin-top: 83px;margin-left: 56px;text-indent: 300px;line-height: 1.3;}'
			+'.attachment .evaluation{display:inline}'
			
			+'@media print {'
			+'@page { margin:0;padding:0}}</style>';
		}
		else if(x=='attachment2'){
			var printing_css='<style>select, span, .span{ display:block; margin-bottom:11px}'
			+'table{font: 13.3333px Arial;}'
			
			+'.attachment2{background-image:url(background2.jpg); background-size: 100%;width:538.5px;height:700px;padding-top: 56px;float:left;}'
			+'.attachment2 .for_attachment2{    margin-top: 80px;width: 450px;margin-left: 45px;}'
			+'.attachment2 .for_attachment2 tr:nth-child(1) {display:none}'
			+'.attachment2 .for_attachment2 tr td:nth-child(1){width: 20px;vertical-align: top;padding-top: 9px;}'
			+'.attachment2 .for_attachment2 tr td:nth-child(2){ width:190px;padding: 2px 2px;text-align: left;}'
			+'.attachment2 .for_attachment2 tr td:nth-child(3){ width:130px;text-align: center;}'
			+'.attachment2 .for_attachment2 tr td:nth-child(4){text-align: center;}'
	
			+'.attachment2 .for_attachment2 select{border:none; background:none;padding-left: 28px;-webkit-appearance: none;-moz-appearance: none}'
			+'.attachment2 .hours{margin-top:100px; margin-left:150px}'
			+'@media print {'
			+'@page { margin:0;padding:0}'
	
			+'}</style>';
		}
		var html_to_print=printing_css+$('#'+x).html();
		
		var iframe=$('<iframe id="print_frame">'); // создаем iframe в переменную
		$('body').append(iframe); //добавляем эту переменную с iframe в наш body (в самый конец)
		
		var doc = $('#print_frame')[0].contentDocument || $('#print_frame')[0].contentWindow.document;
		var win = $('#print_frame')[0].contentWindow || $('#print_frame')[0];
		
		doc.getElementsByTagName('body')[0].innerHTML=html_to_print;
		win.print();
		$('iframe').remove();
	}
	else alert('Не все поля заполнены');
}


$(document).ready(function() {
	
	

	//изменение списка дисциплин в зависимости от курса
	$.subjects(1);
	
	$( '#name_cours_form' ).change(function() {
		$.subjects($( '#name_cours_form' ).val());
	})
	

	$( ".date" ).datepicker({
		inline: true,
		dateFormat: "d      M  yy"
	});
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;Пред',
		nextText: 'След&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
		'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['января','Февраля','марта','апреля','мая','июня',
		'июля','августа','сентября','октября','ноября','декабря'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	
	
	
	// $('.name_cours').val($('.for_name_cours option').html());
	// if($('.for_name_cours').val()==1) $('.sector').val('информационной безопасности');
	
	// $( '.for_name_cours' ).click(function() {
		// $( ".for_name_cours  option:selected" ).each(function() {
			// $('.name_cours').val($(this ).html());
		// });
		
		// $('.for_name_cours').css('display', 'none');
		
		// if($('.for_name_cours').val()==1) $('.sector').val('информационной безопасности');
		// if($('.for_name_cours').val()==2) $('.sector').val('');
	// });
	
	// $( '.name_cours' ).click(function() {
		// $('.for_name_cours').css('display', 'block');
	// });
	// $( '.name_cours' ).focusout(function() {		
		//if(!$('.for_name_cours').is(":focus")){
		//	$('.for_name_cours').css('display', 'none');
		//}
	// });
	
	$('.button').button();
	//$('#for_name_cours').menu();
	
	
})