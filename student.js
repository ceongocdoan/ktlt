const fs = require("fs");

// Đọc dữ liệu từ file students.json
let students = [];
try {
    const data = fs.readFileSync("students.json", "utf-8"); // Đọc file JSON
    students = JSON.parse(data); // Parse nội dung file JSON thành object
} catch (error) {
    console.error("Lỗi khi đọc file students.json:", error.message);
    process.exit(1); // Thoát chương trình nếu lỗi
}

// Hàm hiển thị danh sách sinh viên
function list() {
    console.log("Danh sách sinh viên:");
    students.forEach((student) => {
        console.log(`${student.mssv} - ${student.name}`);
    });
}

// Hàm tìm kiếm sinh viên theo MSSV
function find(mssv) {
    const student = students.find((s) => s.mssv === mssv);
    if (student) {
        console.log(`Thông tin sinh viên: ${student.mssv} - ${student.name} - CPA: ${student.cpa} - Cảnh cáo: ${student.canhcao}`);
    } else {
        console.log("Không tìm thấy sinh viên.");
    }
}

// Hàm cập nhật CPA
function modifyCPA(mssv, newCPA) {
    const student = students.find((s) => s.mssv === mssv);
    if (student) {
        student.cpa = parseFloat(newCPA);
        console.log(`CPA của sinh viên ${mssv} đã được cập nhật thành ${newCPA}.`);
    } else {
        console.log("Không tìm thấy sinh viên để cập nhật.");
    }
}

// Hàm tìm n sinh viên có CPA cao nhất
function findTop(n) {
    const sorted = [...students].sort((a, b) => b.cpa - a.cpa).slice(0, n);
    console.log(`Top ${n} sinh viên có CPA cao nhất:`);
    sorted.forEach((student) => console.log(`${student.mssv} - ${student.name} - CPA: ${student.cpa}`));
}
function listLastTwo() {
    console.log("2 sinh viên cuối trong danh sách:");
    const lastTwo = students.slice(-2); // Lấy 2 phần tử cuối cùng
    lastTwo.forEach((student) => {
        console.log(`${student.mssv} - ${student.name}`);
    });
}

// Hàm tìm n sinh viên có CPA thấp nhất
function findBottom(n) {
    const sorted = [...students].sort((a, b) => a.cpa - b.cpa).slice(0, n);
    console.log(`Bottom ${n} sinh viên có CPA thấp nhất:`);
    sorted.forEach((student) => console.log(`${student.mssv} - ${student.name} - CPA: ${student.cpa}`));
}
function modifyFirstCPA(newCPA) {
    if (students.length > 0) {
        students[0].cpa = parseFloat(newCPA); // Cập nhật CPA cho sinh viên đầu tiên
        console.log(`CPA của sinh viên đầu tiên (${students[0].mssv}) đã được cập nhật thành ${newCPA}.`);
    } else {
        console.log("Danh sách sinh viên trống, không thể cập nhật.");
    }
}
function saveStudents() {
    try {
        fs.writeFileSync("students.json", JSON.stringify(students, null, 2), "utf-8");
        console.log("Dữ liệu đã được lưu lại thành công.");
    } catch (error) {
        console.error("Lỗi khi lưu file students.json:", error.message);
    }
}
function modifyFirstCPA(newCPA) {
    if (students.length > 0) {
        students[0].cpa = parseFloat(newCPA); // Cập nhật CPA cho sinh viên đầu tiên
        console.log(`CPA của sinh viên đầu tiên (${students[0].mssv}) đã được cập nhật thành ${newCPA}.`);
        saveStudents(); // Lưu thay đổi vào file JSON
    } else {
        console.log("Danh sách sinh viên trống, không thể cập nhật.");
    }
}
function findLast() {
    if (students.length > 0) {
        const lastStudent = students[students.length - 1]; // Lấy phần tử cuối cùng
        console.log(`Thông tin sinh viên cuối cùng: ${lastStudent.mssv} - ${lastStudent.name} - CPA: ${lastStudent.cpa} - Cảnh cáo: ${lastStudent.canhcao}`);
    } else {
        console.log("Danh sách sinh viên trống.");
    }
}

// Hàm tìm sinh viên bị cảnh cáo
function findCanhCao() {
    console.log("Danh sách sinh viên bị cảnh cáo:");

    let count = 0;  

    // Lọc danh sách sinh viên bị cảnh cáo
    for (let i = 0; i < students.length; i++) {
        const s = students[i];

        // Xác định mức cảnh cáo dựa trên CPA
        if (s.cpa <= 0.5) s.canhcao = 3;
        else if (s.cpa <= 1.0) s.canhcao = 2;
        else if (s.cpa <= 1.5) s.canhcao = 1;
        else s.canhcao = 0; 

        if (s.canhcao > 0) {
            console.log(`${s.mssv} - ${s.name} - CPA: ${s.cpa} - Mức cảnh cáo: ${s.canhcao}`);
            count++; 

            // Dừng khi đã in đủ 3 sinh viên
            if (count === 3) break;
        }
    }
}

//Hàm tìm số sinh viên có CPA trong khoảng 2.4 - 3.0
function countInRange2_4_3_0() {
    const count = students.filter(s => s.cpa >= 2.4 && s.cpa <= 3.0).length;
    console.log(`Số sinh viên có CPA trong khoảng [2.4, 3.0] là: ${count}`);
}

//Hàm tìm số sinh viên bị đình chỉ
function countDinhChi(currentYear) {
    const count = students.filter((s) => {
        const mssvStr = s.mssv.toString();
        
        if (mssvStr.length < 4) {
            console.log(`MSSV không hợp lệ: ${s.mssv}`);  
            return false;
        }

        const startYear = parseInt(mssvStr.substring(0, 4)); 
        if (isNaN(startYear)) {
            console.log(`Không thể lấy năm nhập học từ MSSV: ${s.mssv}`);
            return false;
        }

        const studyYears = currentYear - startYear;

        return studyYears > 5 && s.cpa <= 0.5;
    }).length;

    console.log(`Tổng số sinh viên bị đình chỉ học là: ${count}`);
}

// Hàm main: xử lý nhập từ terminal
function main() {
    const args = process.argv.slice(2); // Lấy tham số từ terminal
    const command = args[0];

    switch (command) {
        case "list":
            list();
            break;
        case "find":
            find(args[1]);
            break;
        case "modify":
            modifyCPA(args[1], args[2]);
            break;
        case "findtop":
            findTop(parseInt(args[1]));
            break;

            case "modifyfirst":
    modifyFirstCPA(args[1]); // Cập nhật CPA mới được truyền từ dòng lệnh
    break;

        case "findbottom":
            findBottom(parseInt(args[1]));
            break;

            case "listLastTwo":
    listLastTwo(); // Gọi hàm in ra 2 sinh viên cuối
    break;
    case "findlast":
        findLast(); // Gọi hàm tìm sinh viên cuối cùng
        break;
    
        case "canhcao":
            findCanhCao();
            break;
        
            case "countInRange":
            countInRange2_4_3_0();
            break;

            case "countDinhChi": 
            countDinhChi(args[1]);
            break;
        default:
            console.log("Lệnh không hợp lệ. Các lệnh hỗ trợ:modifyfirst,findlast, listLastTwo, list, find, modify, findtop, findbottom, canhcao.");
    }
}

main();