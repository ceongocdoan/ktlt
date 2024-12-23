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
        console.log(`${student.mssv} - ${student.hoTen}`);
    });
}

// Hàm tìm kiếm sinh viên theo MSSV
function find(mssv) {
    const student = students.find((s) => s.mssv === mssv);
    if (student) {
        console.log(`Thông tin sinh viên: ${student.mssv} - ${student.hoTen} - CPA: ${student.cpa} - Cảnh cáo: ${student.canhCao}`);
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
    sorted.forEach((student) => console.log(`${student.mssv} - ${student.hoTen} - CPA: ${student.cpa}`));
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
    sorted.forEach((student) => console.log(`${student.mssv} - ${student.hoTen} - CPA: ${student.cpa}`));
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
    students.forEach((s) => {
        if (s.cpa <= 0.5) s.canhCao = 3;
        else if (s.cpa <= 1.0) s.canhCao = 2;
        else if (s.cpa <= 1.5) s.canhCao = 1;
        else s.canhCao = 0; // Không cảnh cáo
        if (s.canhCao > 0) {
            console.log(`${s.mssv} - ${s.hoTen} - CPA: ${s.cpa} - Mức cảnh cáo: ${s.canhCao}`);
        }
    });
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
        default:
            console.log("Lệnh không hợp lệ. Các lệnh hỗ trợ:modifyfirst,findlast, listLastTwo, list, find, modify, findtop, findbottom, canhcao.");
    }
}

main();
