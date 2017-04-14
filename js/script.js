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
			$(this).addClass('error');	
			error=1;
		}
		else{
						
			//для дисциплин
			if(id=='subjects'){
				$('.attachment2 #subjects_form').remove();
				$(this).clone().appendTo('.'+x+' .'+id);
				$('.attachment2 #subjects_form select option').each(function() {					
					if($(this).val()!=$("form #subjects_form select").val()) $(this).remove();
				})
			
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
	
	if(error==1) alert('Не все поля заполнены');
	
	if (x=='diploma'){
		var surname=$('#surname_form').val().substr(0,3);
		var name=$('#name_form').val().substr(0,3);
		var middlename=$('#middlename_form').val().substr(0,3);
		if ($('#surname_dat_form').val().substr(0,3)!=surname) {error=2; $('#surname_dat_form').addClass('error')}
		if ($('#surname_rod_form').val().substr(0,3)!=surname) {error=2; $('#surname_rod_form').addClass('error')}
		
		if ($('#name_dat_form').val().substr(0,3)!=name) {error=2; $('#name_dat_form').addClass('error')}
		if ($('#name_rod_form').val().substr(0,3)!=name) {error=2; $('#name_rod_form').addClass('error')}
		
		if ($('#middlename_dat_form').val().substr(0,3)!=middlename) {error=2; $('#middlename_dat_form').addClass('error')}
		if ($('#middlename_rod_form').val().substr(0,3)!=middlename) {error=2; $('#middlename_rod_form').addClass('error')}
	}
	if(error==2)  alert('Проверьте правильность написание полей с именем');
	error=0;
	// если все поля заполнены и имена совпадают
	if(!error){
		if(x=='diploma'){
			var printing_css='<style>\ span, .span{ display:block; margin-bottom:0.3cm;font: 13.3333px Arial;}'
			+'.diploma{background-image:url(./background.png); background-size: 100%;width:28.5cm;height:18.2cm;//padding-top:70px;margin-left:5px;}'
			+'.diploma .left, .diploma .right{width:45%; height:100%; float:left;margin-top:1.8cm;//height:653px;}'
			+'.diploma .right{padding-left: 2cm;}'

			+'.diploma .reg_number{margin-left: 7.7cm;margin-top: 15.6cm;}'

			+'.diploma .surname_dat{margin-left: 5cm;}'
			+'.diploma .name_dat{margin-left: 2cm;display:inline  }'
			+'.diploma .middlename_dat,.diploma .middlename_rod{margin-left: 0.3cm; display:inline }'

			+'.diploma .date1{margin-left: 3.9cm; display:inline;white-space: pre;}'
			+'.diploma .date2{display:inline;white-space: pre;margin-left: 1.8cm}'
			+'.diploma .date3{margin-left: 4.5cm;white-space: pre;}'
			+'.diploma .name_inst{margin-left: 0.8cm;line-height: 2;text-indent: 8.1cm; padding: 0px;margin-top: -0.1cm;    margin-bottom: 0.1cm;}'
			+'.diploma .for_name_cours{padding-left:0.8cm;margin-top: -0.1cm;margin-bottom: 0.2cm;}'
			+'.diploma .name_cours{display:inline;line-height: 2;text-indent: 1cm;}'
			+'.diploma .prog{display:inline;margin-left: 0.5cm;}'

			+'.diploma .surname_rod{margin-left: 3.4cm;  }'
			+'.diploma .name_rod{margin-left: 1.3cm;display:inline  }'
			+'.diploma .scope{margin-left: 1cm;margin-top:0.9cm;text-transform:uppercase}'
			+'.diploma .s_y {margin-top:5.9cm;margin-left: 1.8cm;}'
			+'.diploma .sity{display:inline;padding-left:0.3cm}'
			+'.diploma .year{display:inline;padding-left:2.4cm}'
			
			+'@media print {'
			+'@page {size: landscape; margin:0;padding:0}}</style>';
		}
		else if(x=='attachment'){
			var printing_css='<style> span, .span{ display:block; margin-bottom:0.5cm;font: 13.3333px Arial;}'
			+'.span{display:table}'
			+'span.number span{display:inline; margin-right:5px}'
			
			+'.attachment{background-image:url(background1.jpg); background-size: 100%;width:14.25cm;height:20cm;padding-top: 1.3cm;margin:auto}'
			+'.attachment .number{margin-left:11cm}'
			+'.attachment .surname{margin-left:1.5cm;float:left; margin-top:2.4cm}'
			+'.attachment .name, .attachment .middlename{ margin-top:2.4cm;float:left;margin-left:0.25cm;}'
			
			+'.attachment .educ{margin-top:4.7cm;margin-left:7.5cm;}'
			
			+'.attachment .date1{margin-left: 1.8cm; float:left;white-space: pre;margin-top: 0.9cm;}'
			+'.attachment .date2{float:left;white-space: pre;margin-left: 2.8cm;margin-top: 0.9cm;}'
			
			+'.attachment .name_inst{margin-top:-0.9cm;margin-left: 1.5cm;text-indent: 10cm;line-height: 2.5}'
			+'.attachment .name_cours{margin-top: 0.2cm;margin-left: 1.5cm;text-indent: 2.5cm;line-height: 1.3;}'
			
			+'.attachment .atestation{margin-top: 2.3cm;margin-left: 1.5cm;text-indent: 8.5cm;line-height: 1.3;}'
			+'.attachment .evaluation{display:inline}'
			
			+'@media print {'
			+'@page { margin:0;padding:0}}</style>';
		}
		else if(x=='attachment2'){
			var printing_css='<style>select, span, .span{ display:block; margin-bottom:11px}'
			+'table{font: 13.3333px Arial;}'
			
			+'.attachment2{background-image:url(background2.jpg); background-size: 100%;width:14.25cm;height:20cm;padding-top: 2.5cm;margin:auto}'
			+'.attachment2 .for_attachment2{    margin-top: 1cm;width: 12cm;margin-left: 1cm;}'
			+'.attachment2 .for_attachment2 tr:nth-child(1) {display:none}'
			+'.attachment2 .for_attachment2 tr td:nth-child(1){width: 0.9cm;vertical-align: top;padding-top: 9px;text-align: center;}'
			+'.attachment2 .for_attachment2 tr td:nth-child(2){ width:5cm;padding: 2px 2px;text-align: left;}'
			+'.attachment2 .for_attachment2 tr td:nth-child(3){ width:3.5cm;text-align: center;}'
			+'.attachment2 .for_attachment2 tr td:nth-child(4){text-align: center;}'
	
			+'.attachment2 .for_attachment2 select{border:none; background:none;padding-left: 0.8cm;-webkit-appearance: none;-moz-appearance: none}'
			+'.attachment2 .hours{margin-top:2.8cm; margin-left:4cm;}'
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
	
 	$('input').click(function(){
		$(this).removeClass('error');
	});
	
	$('.button').button();
	
	
})