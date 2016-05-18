frappe.ui.form.on("Attendance","out_time",function(frm){
	if (frm.doc.in_time>frm.doc.out_time)
		frappe.msgprint("In time Must be smaller than out time")
		frm.doc.out_time="";
		refresh_field("out_time");
})


frappe.ui.form.on("Salary Structure","ctc",function(frm){
	doc=frm.doc;
	  var gross=doc.ctc;
	  var cl=doc.earnings ||[];

	  for(var i = 0; i < cl.length; i++){
	      if(cl[i].e_type=='Basic') cl[i].modified_value = gross*0.38;
	      if(cl[i].e_type=='House Rent Allowance') cl[i].modified_value = gross*0.266;
	      if(cl[i].e_type=='Medical Allowance') cl[i].modified_value = gross*0.076;
	      if(cl[i].e_type=='Convayance Allowance') cl[i].modified_value=gross*0.076;
	      if(cl[i].e_type=='Lunch Allowance') cl[i].modified_value=gross*0.06;
	      if(cl[i].e_type=='Others') cl[i].modified_value = gross*0.142;
	  }
	  refresh_field('earnings');

	  var cll=doc.deductions ||[];

	  // var cll = getchildren('Salary Structure Deduction', doc.name, 'deduction_details', doc.doctype);
	  for(var i = 0; i < cll.length; i++){

	      if(cll[i].d_type=='Professional Tax'){
	        if(gross<15000) cll[i].d_modified_amt =175;
	        else cll[i].d_modified_amt = 200;
	      } 
	  }
	  refresh_field('deductions');
})
frappe.ui.form.on('Employee', {
	refresh: function(frm) {
		if((!frm.doc.__islocal) && (frm.doc.relieving_date)) {
			frm.add_custom_button(__('Make Relieving Documents'),
				function() {
					make_relieving_document(frm)
				}
			);
		}


	}
});
function make_relieving_document (frm) {
	frappe.model.open_mapped_doc({
		method: "internalhr.custom_py_method.make_relieving_document",
		frm: frm
	});
	
}
frappe.ui.form.on("Offer Letter","monthly_salary",function(frm){

doc=frm.doc;
	  var gross=doc.monthly_salary;
	  var cl=doc.earnings ||[];

	  for(var i = 0; i < cl.length; i++){
	      if(cl[i].e_type=='Basic') cl[i].modified_value = gross*0.38;
	      if(cl[i].e_type=='House Rent Allowance') cl[i].modified_value = gross*0.266;
	      if(cl[i].e_type=='Medical Allowance') cl[i].modified_value = gross*0.076;
	      if(cl[i].e_type=='Convayance Allowance') cl[i].modified_value=gross*0.076;
	      if(cl[i].e_type=='Lunch Allowance') cl[i].modified_value=gross*0.06;
	      if(cl[i].e_type=='Others') cl[i].modified_value = gross*0.142;
	  }
	  refresh_field('earnings');

	})

frappe.ui.form.on("Offer Letter","onload",function(frm){
	
	doc=frm.doc;
	  
	  var cl=doc.earnings ;
	  
	  for(var i = 0; i <6; i++){
	  	 var earning= frappe.model.add_child(doc, "Salary Structure Earning", "earnings");
	  	 if (i==0)earning.e_type="Basic"
	  	 	 if (i==1)earning.e_type="House Rent Allowance"
	  	 	 	 if (i==2)earning.e_type="Medical Allowance"
	  	 	 	 	 if (i==3)earning.e_type="Convayance Allowance"
	  	 	 	 	 	 if (i==4)earning.e_type="Lunch Allowance"
	  	 	 	 	 	 	 if (i==5)earning.e_type="Others"

}

 
	   
	  
	  refresh_field('earnings');
	})
