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

// Hàm tìm n sinh viên có CPA thấp nhất
function findBottom(n) {
    const sorted = [...students].sort((a, b) => a.cpa - b.cpa).slice(0, n);
    console.log(`Bottom ${n} sinh viên có CPA thấp nhất:`);
    sorted.forEach((student) => console.log(`${student.mssv} - ${student.hoTen} - CPA: ${student.cpa}`));
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
        case "findbottom":
            findBottom(parseInt(args[1]));
            break;
        case "canhcao":
            findCanhCao();
            break;
        default:
            console.log("Lệnh không hợp lệ. Các lệnh hỗ trợ: list, find, modify, findtop, findbottom, canhcao.");
    }
}

main();
