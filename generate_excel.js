import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceJsonPath = 'C:/Users/ABARNA B/.gemini/antigravity-ide/brain/67d67b3f-df7e-4667-9ec5-e8c2b028a68b/scratch/students_data.json';
const rawData = JSON.parse(fs.readFileSync(sourceJsonPath, 'utf8'));

const targetDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
const targetJsonPath = path.join(targetDir, 'studentsData.json');
fs.writeFileSync(targetJsonPath, JSON.stringify(rawData, null, 2));
console.log("Saved studentsData.json to:", targetJsonPath);

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(rawData);
XLSX.utils.book_append_sheet(wb, ws, "Placement_Skill_Gap_Data");

const excelPath = path.join(__dirname, 'Placement_Skill_Gap_Hub_Practice.xlsx');
XLSX.writeFile(wb, excelPath);
console.log("Successfully created Placement_Skill_Gap_Hub_Practice.xlsx at:", excelPath);
