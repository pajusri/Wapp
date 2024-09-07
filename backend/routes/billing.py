from flask import Blueprint, jsonify, request
import openpyxl
import os

billing_bp = Blueprint('billing', __name__)

# Path to Excel file (same as customer requests)
FILE_PATH = '/Users/admin/APP1/customer_requests.xlsx'

# Load or create Excel file and Billing sheet
def load_or_create_billing_workbook():
    try:
        if os.path.exists(FILE_PATH):
            workbook = openpyxl.load_workbook(FILE_PATH)
            if 'Billing' not in workbook.sheetnames:
                billing_sheet = workbook.create_sheet(title='Billing')
                billing_sheet.append(['Chakki Center', 'Eggs Requested', 'Delivery Date', 'Hatching Date'])
                workbook.save(FILE_PATH)
        else:
            workbook = openpyxl.Workbook()
            billing_sheet = workbook.active
            billing_sheet.title = 'Billing'
            billing_sheet.append(['Chakki Center', 'Eggs Requested', 'Delivery Date', 'Hatching Date'])
            workbook.save(FILE_PATH)
        return workbook
    except Exception as e:
        print(f"Error loading or creating billing workbook: {str(e)}")
        raise

# Get billing entries
@billing_bp.route('/customer/billing-entries', methods=['GET'])
def get_billing_entries():
    try:
        workbook = load_or_create_billing_workbook()
        sheet = workbook['Billing']
        billing_entries = []

        for row in sheet.iter_rows(min_row=2, values_only=True):
            billing_entries.append({
                'chakkiCenter': row[0],
                'eggsRequested': row[1],
                'deliveryDate': row[2],
                'hatchingDate': row[3]
            })

        return jsonify(billing_entries), 200
    except Exception as e:
        print(f"Error fetching billing entries: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Move request to billing
@billing_bp.route('/customer/request/deliver', methods=['POST'])
def move_to_billing():
    data = request.get_json()
    chakki_center = data.get('chakkiCenter')

    try:
        workbook = openpyxl.load_workbook(FILE_PATH)
        requests_sheet = workbook['Requests']
        billing_sheet = workbook['Billing']

        # Find the request and move to Billing sheet
        for row in requests_sheet.iter_rows(min_row=2):
            if row[0].value == chakki_center and row[4].value == 'No':
                billing_sheet.append([row[0].value, row[1].value, row[2].value, row[3].value])
                row[4].value = 'Yes'  # Mark as delivered (in Requests sheet)
                break

        workbook.save(FILE_PATH)
        return jsonify({"message": "Entry sent to billing"}), 200
    except Exception as e:
        print(f"Error moving request to billing: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Delete billing entry
@billing_bp.route('/customer/billing/delete', methods=['POST'])
def delete_billing_entry():
    data = request.get_json()
    chakki_center = data.get('chakkiCenter')

    try:
        workbook = openpyxl.load_workbook(FILE_PATH)
        sheet = workbook['Billing']
        row_to_delete = None

        for row in sheet.iter_rows(min_row=2):
            if row[0].value == chakki_center:
                row_to_delete = row
                break

        if row_to_delete:
            sheet.delete_rows(row_to_delete[0].row)
            workbook.save(FILE_PATH)
            return jsonify({"message": f"Billing entry for {chakki_center} deleted successfully."}), 200
        else:
            return jsonify({"error": f"Billing entry for {chakki_center} not found."}), 404

    except Exception as e:
        print(f"Error deleting billing entry: {str(e)}")
        return jsonify({'error': str(e)}), 500
