from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.mapper import get_mapped_doc
def notify_leave_Manager(doc,method):
	if (not doc.previous_doc) or (doc.previous_doc and \
				doc.status == "Open" and doc.previous_doc.leave_approver != doc.leave_approver):
		manager_list=frappe.db.sql("select cc_name from tabCC where parent = '%s'"%(doc.employee), as_list=1)
		if manager_list:
			for email_id in manager_list:
				subj=_("New Leave Application")
				messages = ("New leave Application:{0} from Employee:{1}").format(doc.name,doc.employee_name)
				frappe.sendmail(email_id[0],subject=subj,message=messages)

@frappe.whitelist()
def make_relieving_document(source_name, target_doc=None):
	def set_missing_values(source, target):
		target.annual_ctc = frappe.db.get_value("Salary Structure",{ "Employee":source.name}, "ctc")
		
	doc = get_mapped_doc("Employee", source_name, {
			"Employee": {
				"doctype": "Relieving Document",
				# "field_map": {
					# "applicant_name": "employee_name",
				# }
				}
		},target_doc, set_missing_values)
	return doc
@frappe.whitelist()
def get_offer_terms():
	offer_terms=frappe.get_all("Offer Terms",fields=["description"] )
	return offer_terms

		
	