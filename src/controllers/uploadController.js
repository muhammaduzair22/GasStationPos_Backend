const multer = require("multer");
const xlsx = require("xlsx");
const db = require("../config/db");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);
const upload = multer({ storage: multer.memoryStorage() }).single("file");

function parseDate(value) {
  if (!value) return null;

  if (typeof value === "number") {
    const utcDays = value - 25569;
    const utcValue = utcDays * 86400; // seconds
    const date = new Date(utcValue * 1000);
    return dayjs.utc(date).format("YYYY-MM-DD"); // return string
  }

  const parsed = dayjs(
    value,
    ["DD-MM-YY", "DD-MM-YYYY", "D-M-YY", "D-M-YYYY"],
    true
  );
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : null;
}

const uploadExcel = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const records = xlsx.utils.sheet_to_json(sheet);

    const values = records.map((row) => [
      row.ww_bill_code || null,
      parseDate(row.received_date),
      row.invoice_no || null,
      row.bill_detail || null,
      row.head_of_account || null,
      row.sanctioned_amount || 0,
      row.cheque_amount || 0,
      row.cash_value || 0,
      row.profit || 0,
      row.total_expenses || 0,
      row.income_tax_hardware || 0,
      row.income_tax_service || 0,
      row.sales_tax_gst_18 || 0,
      row.sales_tax_sst_16 || 0,
      row.one_fifth_gst || 0,
      parseDate(row.date_of_bill),
      parseDate(row.date_of_printing),
    ]);

    const insertQuery = `
      INSERT INTO master_records (
        ww_bill_code, received_date, invoice_no, bill_detail,
        head_of_account, sanctioned_amount, cheque_amount, cash_value,
        profit, total_expenses, income_tax_hardware, income_tax_service,
        sales_tax_gst_18, sales_tax_sst_16, one_fifth_gst, date_of_bill, date_of_printing
      )
      VALUES ?
    `;

    await db.query(insertQuery, [values]);

    res.status(200).json({ message: "Excel data uploaded successfully" });
  } catch (error) {
    console.error("Excel upload error:", error);
    res.status(500).json({ error: "Excel upload failed" });
  }
};

module.exports = {
  upload,
  uploadExcel,
};
